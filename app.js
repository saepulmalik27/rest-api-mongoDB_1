const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
/**
 * @description: database connection setup
 */
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
})
const database = mongoose.connection
database.on('error', (error) => { console.log('error') })
database.once('connected', () => { console.log('connected to database') })
/**
 * @description: express app
 */
const app = express();
app.use(express.json())

/**
 * @description: routes
 */
const routes = require('./routes/routes')
app.use('/api', routes)
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})