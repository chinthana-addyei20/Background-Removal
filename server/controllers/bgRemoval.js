import { removeBackgroundFromImageUrl, removeBackgroundFromImageFile } from "remove.bg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import axios from 'axios'
import crypto from 'crypto'
import { saveRecord } from '../utils/storage.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads dir exists
const ensureUploadsDir = () => {
  const uploadDir = path.join(__dirname, '..', 'uploads')
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
  return uploadDir
}

// Process the image and remove background
export const removeBackground = async (req, res) => {
  try {
    const { imageUrl } = req.body
    const uploadDir = ensureUploadsDir()

    // If an uploaded file is present (multer), prefer that
    if (req.file) {
      const uploadedPath = req.file.path
      const ext = path.extname(req.file.originalname) || '.png'
      const processedFilename = `${Date.now()}_${crypto.randomUUID()}${ext}`
      const processedPath = path.join(uploadDir, processedFilename)

      let fallback = false

      // If API key is available, try to use remove.bg on the local file
      if (process.env.REMOVE_BG_API_KEY && process.env.REMOVE_BG_API_KEY !== 'your-remove-bg-api-key-here') {
        try {
          await removeBackgroundFromImageFile({
            path: uploadedPath,
            apiKey: process.env.REMOVE_BG_API_KEY,
            size: 'regular',
            type: 'auto',
            outputFile: processedPath
          })
        } catch (err) {
          console.warn('remove.bg file API failed, falling back to keeping uploaded file:', err?.message || err)
          // fallback to using the uploaded file as-is
          fs.renameSync(uploadedPath, processedPath)
          fallback = true
        }
      } else {
        // No API key; just keep the uploaded file
        fs.renameSync(uploadedPath, processedPath)
        fallback = true
      }

      const record = {
        id: crypto.randomUUID(),
        originalName: req.file.originalname,
        processedFilename,
        url: `/uploads/${processedFilename}`,
        createdAt: new Date().toISOString(),
        fallback
      }

      saveRecord(record)

      return res.json({ success: true, record })
    }

    // Otherwise, if an imageUrl is provided, try to process it
    if (imageUrl) {
      // download image to temp
      const tempFilename = `${Date.now()}_${crypto.randomUUID()}.tmp`
      const tempPath = path.join(ensureUploadsDir(), tempFilename)
      const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' })
      fs.writeFileSync(tempPath, resp.data)

      const ext = path.extname(new URL(imageUrl).pathname) || '.png'
      const processedFilename = `${Date.now()}_${crypto.randomUUID()}${ext}`
      const processedPath = path.join(ensureUploadsDir(), processedFilename)

      let fallback = false

      if (process.env.REMOVE_BG_API_KEY && process.env.REMOVE_BG_API_KEY !== 'your-remove-bg-api-key-here') {
        try {
          await removeBackgroundFromImageUrl({
            url: imageUrl,
            apiKey: process.env.REMOVE_BG_API_KEY,
            size: 'regular',
            type: 'auto',
            outputFile: processedPath
          })
        } catch (err) {
          console.warn('remove.bg URL API failed, falling back to saving original image:', err?.message || err)
          fs.renameSync(tempPath, processedPath)
          fallback = true
        }
      } else {
        // No API key: just save original image
        fs.renameSync(tempPath, processedPath)
        fallback = true
      }

      const record = {
        id: crypto.randomUUID(),
        originalName: imageUrl,
        processedFilename,
        url: `/uploads/${processedFilename}`,
        createdAt: new Date().toISOString(),
        fallback
      }

      saveRecord(record)

      return res.json({ success: true, record })
    }

    return res.status(400).json({ error: 'No image provided (file or imageUrl)' })
  } catch (error) {
    console.error('Error processing image:', error)
    res.status(500).json({ error: 'Failed to process image', details: error?.message })
  }
}