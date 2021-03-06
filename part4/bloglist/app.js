const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger.js')
const { errorHandler, tokenExtractor } = require('./utils/middleware.js')


mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to mongoDB Database');
    })
    .catch(error => {
        logger.error('error connecting to mongoDB', error.message);
    })

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

module.exports = app