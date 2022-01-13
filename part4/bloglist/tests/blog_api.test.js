const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const api = supertest(app)

const Blog = require('../models/blog.js')

beforeEach (async () => {
    await Blog.deleteMany({})

    for (let blog of helper.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    } 
})

test('blogs are returned in JSON format and the correct number of blogs are returned', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await Blog.find({})
    expect(response).toHaveLength(helper.blogs.length)
})

test('blogs have a unique identifier', async () => {
    const response = await Blog.find({})
    expect(response[0].id).toBeDefined()
})

test('a blog can be added', async () => {
    const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})
    const blogsAtTheEnd = blogs.map(b => b.toJSON())
    expect(blogsAtTheEnd).toHaveLength(helper.blogs.length + 1)
    const content = blogsAtTheEnd.map(b => b.title)
    expect(content).toContain('Go To Statement Considered Harmful')
})

test('likes is 0 if there is no likes property in the request', async () => {
    const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const blogs = await Blog.find({})
    const blogsJSON = blogs.map(b => b.toJSON())
    const length = helper.blogs.length
    expect(blogsJSON[length].likes).toBe(0)
})

test('bad request if the title and url are missing', async () => {
    const newBlog = {
        author: 'Edsger W. Dijkstra',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('deleting a blog', async () => {
    const blogsAtStart = await Blog.find({})

    await api
        .delete(`/api/blogs/${blogsAtStart[0].id}`)
        .expect(204)
    
    const blogsAtEnd = await Blog.find({})

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    const content = blogsAtEnd.map(b => b.title)
    expect(content).not.toContain(blogsAtStart[0].title)
})

test('updating a blog', async () => {
    const blogsAtStart = await Blog.find({})

    const updatedBlog = {
        likes: 100,
    }

    await api
        .put(`/api/blogs/${blogsAtStart[0].id}`)
        .send(updatedBlog)
        .expect(200)
    
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes)
})

afterAll(() => {
    mongoose.connection.close()
})