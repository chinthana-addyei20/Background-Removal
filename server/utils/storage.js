import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataDir = path.join(__dirname, '..', 'data')
const dataFile = path.join(dataDir, 'images.json')

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]))

const readAll = () => {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to read storage file', err)
    return []
  }
}

const writeAll = (arr) => {
  fs.writeFileSync(dataFile, JSON.stringify(arr, null, 2))
}

export const saveRecord = (record) => {
  const all = readAll()
  all.push(record)
  writeAll(all)
}

export const getAll = () => readAll()

export const getById = (id) => {
  const all = readAll()
  return all.find(r => r.id === id)
}

export default { saveRecord, getAll, getById }
