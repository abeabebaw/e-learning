import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()
<<<<<<< HEAD
connectDB();
app.use(cors())

=======
connectDB()
app.use(cors())
>>>>>>> 9c99c67dfec2f8eb3d4eb1cd783ba091bd06f528

app.get('/', (req, res) => {
  res.send('api working')
})
<<<<<<< HEAD

app.post('clerk',express.json(), clerkWebhooks)
=======

// Corrected webhook route
app.post('/clerk', express.json(), clerkWebhooks)

>>>>>>> 9c99c67dfec2f8eb3d4eb1cd783ba091bd06f528
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
