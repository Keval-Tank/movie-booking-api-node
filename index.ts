import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
    mongoose.connect(process.env.DB_URL!)
    .catch((err) => console.log("Failed to connect", err))
    .finally(() => {console.log("Successfully connected to Database")
        // schema.MovieSchema.create({
        //     name : "Movie 1",
        //     description : "type of movie",
        //     casts : ["Actor 1", "Actor 2", "Actress"],
        //     director : "Director of the flim",
        //     trailerUrl : 'http://localhost:4444/movie1',
        //     language : "German",
        //     releaseDate : '19-12-2025',
        //     releaseStatus : "UPCOMING"
        // })
    })
})
