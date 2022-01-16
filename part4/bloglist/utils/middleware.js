const logger = require('./logger.js')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }
    
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
    errorHandler, tokenExtractor
}