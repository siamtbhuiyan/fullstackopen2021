const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
  
    const saved = await blog.save()
    response.json(saved)
  })

  module.exports = blogsRouter