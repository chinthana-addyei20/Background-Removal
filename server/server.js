import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './configs/mongodb.js'
import bgRemovalRoutes from './routes/bgRemoval.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// App Config 
const PORT = process.env.PORT || 5000
const app = express()

// Initialize Middleware
app.use(express.json())
app.use(cors())

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API routes
app.get('/', (req, res) => res.send("API Working"))
app.use('/api', bgRemovalRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: 'Something went wrong!',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
})

// Start server in degraded mode if MongoDB is unavailable
const startServer = async () => {
    // Try to connect to MongoDB but don't crash the server if it fails.
    connectDB()
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.warn('MongoDB not available — running in degraded mode:', err?.message || err))

    // Start listening regardless of DB connection state
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

startServer()