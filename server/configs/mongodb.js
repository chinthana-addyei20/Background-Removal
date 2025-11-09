import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        // Connection events for better debugging
        mongoose.connection.on('connected', () => {
            console.log('MongoDB: connected')
        })

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err?.message || err)
        })

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB: disconnected')
        })

        const uri = process.env.MONGODB_URI
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment')
        }

        // Use the full URI from .env (do NOT append a DB name here)
        await mongoose.connect(uri)
        console.log('MongoDB: connection established')
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error?.message || error)
        throw error
    }
}

export default connectDB