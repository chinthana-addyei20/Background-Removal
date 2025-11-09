import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('ERROR: MONGODB_URI not defined in .env')
  process.exit(1)
}

console.log('Testing MongoDB connection to:', uri)

const connect = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    })
    console.log('MongoDB connection successful')
    console.log('MongoDB host:', conn.connection.host)
    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('MongoDB connection failed:')
    console.error('name:', err.name)
    console.error('message:', err.message)
    if (err.code) console.error('code:', err.code)
    if (err.reason) console.error('reason:', err.reason)
    if (err.stack) console.error(err.stack)
    process.exit(2)
  }
}

connect()
