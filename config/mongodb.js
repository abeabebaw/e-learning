import mongoose from 'mongoose'

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('database connected')
  })
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

  await mongoose.connect(`${process.env.MONGODB_URI}/finallms`)
}

export default connectDB
