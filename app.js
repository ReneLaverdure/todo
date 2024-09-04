require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const errorHandlerMiddleware = require('./utils/middleware/error-handler.js')
const authRoute = require('./routes/auth.route.js')

const dbConnection = require('./DB/dbConnection')

const PORT = process.env.PORT || 5000


app.use(express.json())


// setting up routes 
app.use('/api/auth', authRoute)

app.use(errorHandlerMiddleware)

const main = async () => {
    try {
        await dbConnection(process.env.MONGO_CONNECTION_URL)
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

main()

