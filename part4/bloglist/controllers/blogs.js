const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const { userExtractor } = require('../utils/middleware.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })
  
  const saved = await blog.save()

  user.blogs = user.blogs.concat(saved._id)
  await user.save()

  if (saved.title && saved.url) {
    response.json(saved)
  } else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user

  const blog = await Blog.findById({ _id: id })

  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } 
  
})

blogsRouter.put('/:id', async (request, response) => {
  let blog = request.body

  blog = {
    ...request.body,
    user: request.body.user.id,
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id, 
      blog, 
      { new: true, runValidators: true, context: 'query' }
    )
      
  response.json(updatedBlog)
})


module.exports = blogsRouter