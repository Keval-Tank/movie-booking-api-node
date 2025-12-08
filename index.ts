import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
    mongoose.connect(process.env.DB_URL!)
    .catch((err) => console.log("Failed to connect", err))
    .finally(() => console.log("Successfully connected to Database"))
})
