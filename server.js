import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()
connectDB()
app.use(cors())

app.get('/', (req, res) => {
  res.send('api working')
})

// Corrected webhook route
app.post('/clerk', express.json(), clerkWebhooks)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
