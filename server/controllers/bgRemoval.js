import { removeBackgroundFromImageUrl, removeBackgroundFromImageFile } from "remove.bg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import axios from 'axios'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read file as base64 data URL
const fileToDataURL = (filePath, mime = 'image/png') => {
  const b = fs.readFileSync(filePath)
  return `data:${mime};base64,${b.toString('base64')}`
}

// Process the image and remove background
export const removeBackground = async (req, res) => {
  try {
    const { imageUrl } = req.body

    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, '..', 'uploads')
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

    // If an uploaded file is present (multer), prefer that
    if (req.file) {
      const uploadedPath = req.file.path
      const outputPath = path.join(outputDir, `${Date.now()}_no_bg.png`)

      // If API key is available, try to use remove.bg on the local file
      if (process.env.REMOVE_BG_API_KEY && process.env.REMOVE_BG_API_KEY !== 'your-remove-bg-api-key-here') {
        try {
          await removeBackgroundFromImageFile({
            path: uploadedPath,
            apiKey: process.env.REMOVE_BG_API_KEY,
            size: 'regular',
            type: 'auto',
            outputFile: outputPath
          })

          const processedImageBase64 = fs.readFileSync(outputPath, 'base64')
          // Cleanup
          fs.unlinkSync(outputPath)
          fs.unlinkSync(uploadedPath)

          return res.json({ success: true, processedImage: `data:image/png;base64,${processedImageBase64}` })
        } catch (err) {
          console.warn('remove.bg file API failed, falling back to returning the uploaded file:', err?.message || err)
          // fall through to return uploaded file as-is
        }
      }

      // Fallback: return original uploaded file as base64 so frontend can continue testing
      const dataUrl = fileToDataURL(uploadedPath, req.file.mimetype || 'image/png')
      // remove the uploaded file
      fs.unlinkSync(uploadedPath)
      return res.json({ success: true, processedImage: dataUrl, fallback: true })
    }

    // Otherwise, if an imageUrl is provided, try to process it
    if (imageUrl) {
      const outputPath = path.join(outputDir, `${Date.now()}_no_bg.png`)

      if (process.env.REMOVE_BG_API_KEY && process.env.REMOVE_BG_API_KEY !== 'your-remove-bg-api-key-here') {
        // Use remove.bg URL API
        await removeBackgroundFromImageUrl({
          url: imageUrl,
          apiKey: process.env.REMOVE_BG_API_KEY,
          size: 'regular',
          type: 'auto',
          outputFile: outputPath
        })

        const processedImageBase64 = fs.readFileSync(outputPath, 'base64')
        fs.unlinkSync(outputPath)
        return res.json({ success: true, processedImage: `data:image/png;base64,${processedImageBase64}` })
      }

      // Fallback: fetch the image and return it as-is
      const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' })
      const b64 = Buffer.from(resp.data).toString('base64')
      return res.json({ success: true, processedImage: `data:${resp.headers['content-type']};base64,${b64}`, fallback: true })
    }

    return res.status(400).json({ error: 'No image provided (file or imageUrl)' })
  } catch (error) {
    console.error('Error processing image:', error)
    res.status(500).json({ error: 'Failed to process image', details: error?.message })
  }
}