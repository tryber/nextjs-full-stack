import mongoose from 'mongoose'

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }
  mongoose.set('strictQuery', false)
  await mongoose.connect('mongodb://localhost:27017/nextjs')
}

export default dbConnect
