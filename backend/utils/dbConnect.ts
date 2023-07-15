import mongoose from 'mongoose'

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) return

  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/nextjs')
}

export default dbConnect
