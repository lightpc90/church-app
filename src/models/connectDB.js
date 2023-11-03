import mongoose from 'mongoose'
import { uri } from './config'

const MONGODB_URI = uri
if (!MONGODB_URI) {
    console.log("mongodb uri not provided")
    return
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
        })
        console.log('MongoDB Connected...')
    } catch (err) {
        console.error('Error Connecting to Database: ', err.message)
        process.exit(1)
    }
}

export default connectDB