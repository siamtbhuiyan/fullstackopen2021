const logger = require('./logger.js')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    } else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const token = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(token.id)
    request.user = user
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'ValidationError') {
        response.status(400).send({ error: error.message })
    } else if (error.name == 'JsonWebTokenError') {
        response.status(401).send({ error: 'token missing or invalid' })
    }

    next(error)
}

module.exports = {
    errorHandler, tokenExtractor, userExtractor
}