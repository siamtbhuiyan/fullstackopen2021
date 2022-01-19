import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
  
  const handleCreate = async (e) => {
    e.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setMessage(`${title} added by ${author}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
    
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  if (user === null) {
    return (
      <div>
        <Notification message={message} errorMessage={errorMessage}/>
        <h2>Log in to application</h2>
        {loginForm()}
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
        <h3>Create New</h3>
        <div>
          <form onSubmit={handleCreate}>
            <div>
              title:
              <input type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
              author:
              <input type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
              url:
              <input type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type='submit'>create</button>
          </form>
        </div>
        <br />
        <h3>Bloglist</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

        
      </div>
    )
  }
}

export default App