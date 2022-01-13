const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require ('../app')
const helper = require('../utils/list_helper')
const bcrypt = require('bcrypt')
const api = supertest(app)

const User = require('../models/user.js')

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of helper.users) {
        const saltround = 10
        const password = await bcrypt.hash(user.password, saltround)
        let userObject = new User({
            username: user.username,
            name: user.name,
            passwordHash: password
        })
        await userObject.save()
    }
}, 100000)

test('invalid users are not added and sends suitable status code and error message', async () => {
    const newUser = {
        username: 'johndoe',
        name: "Something else",
        password: "unique"
    }

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(response.error.text).toContain("User validation failed")
}) 

afterAll(() => {
    mongoose.connection.close()
})