import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (execption) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
      
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }
  
  const handleCreate = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setMessage(`${blogObject.title} added by ${blogObject.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLike = async (updatedBlog) => {
    const response = await blogService.update(updatedBlog)
    console.log(response.likes)
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : response))
    setMessage(`${updatedBlog.title} Liked`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} errorMessage={errorMessage}/>
        <h2>Log in to application</h2>
        <LoginForm 
        handleLogin={handleLogin} 
        username={username} 
        password={password} 
        handleUsernameChange={({ target }) => setUsername(target.value)} 
        handlePasswordChange={({ target }) => setPassword(target.value)}/>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={message} errorMessage={errorMessage}/>
        <form onSubmit={handleLogout}>
        <span>{user.name} is logged in    </span>
        <button type='submit'>logout</button>
        </form>
        <br />
        <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
          <BlogForm
          createBlog={handleCreate}
          />
        </Togglable>
        <br />
        <h3>Bloglist</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={handleLike} />
        )}

        
      </div>
    )
  }
}

export default App