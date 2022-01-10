const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const blogsRouter = require('./controllers/blogs.js')
const logger = require('./utils/logger.js')


mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to mongoDB Database');
    })
    .catch(error => {
        logger.error('error connecting to mongoDB', error.message);
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
