import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [visibility, setVisibility] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)
  let btnName = 'view'

  const handleVisibility = (e) => {
    e.preventDefault()
    setVisibility(!visibility)
  }

  if (visibility) {
    btnName = 'hide'
  } else {
    btnName = 'view'
  }

  const addLike = () => {
    const blogObject = ({
      ...blog,
      likes: blog.likes + 1,
    })

    updateLikes(blogObject)
    setBlogObject(blogObject)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  const blogStyle = {
    listStyle: 'none',
    padding: '20px',
    backgroundColor: '#ddd',
    margin: '10px 0',
    fontSize: '20px'
  }

  const btnStyle = {
    marginLeft: '8px',
  }

  if (!visibility) {
    return (

      <div style={blogStyle} className="blogHidden">
        <li>
          Blog: {blog.title} {blog.author}
          <button style={btnStyle} onClick={handleVisibility} className="visibility-button">{btnName}</button>
        </li>
      </div>
    )
  } else {
    return (

      <div style={blogStyle} className="blogVissible">
        <li>
          Blog: {blog.title} {blog.author}
          <button style={btnStyle} onClick={handleVisibility}>{btnName}</button>
        </li>
        <li>
          Link: {blog.url}
        </li>
        <li>
          Likes: {blogObject.likes}
          <button style={btnStyle} onClick={addLike} className="like-button">Like</button>
        </li>
        <li>
          User: {blog.user.name}
        </li>
        {(blog.user.username === user.username ? <button onClick={handleDelete} style={btnStyle}>Delete</button> : null)}
      </div>
    )
  }

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog