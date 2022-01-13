const usersRouter = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const body = request.body
    const saltRounds = 10
    const password = body.password
    
    if (!password) {
        return response.status(400).send({ error: "password is required" })
    }
    
    else if (password.length <= 3) {
        return response.status(400).send({ error: "password not secure enough" })
    }
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User ({
        username: body.username,
        name: body.name,
        passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter