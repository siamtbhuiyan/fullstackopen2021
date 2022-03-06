import React, { useState } from 'react'
const Blog = ({ blog, updateLikes }) => {
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
    
  console.log(blog)
    updateLikes(blogObject)
    setBlogObject(blogObject)
  }

  const blogStyle = {
    listStyle: "none",
    padding: "20px",
    backgroundColor: "#ddd",
    margin: "10px 0",
    fontSize: "20px"
  }

  const btnStyle = {
    marginLeft: "8px",
  }

  if (!visibility) {
    return (

      <div style={blogStyle}>
        <li>
          Blog: {blog.title} {blog.author}
          <button style={btnStyle} onClick={handleVisibility}>{btnName}</button>
        </li>
      </div>
    )
  } else {
    return (

      <div style={blogStyle}>
        <li>
          Blog: {blog.title} {blog.author}
          <button style={btnStyle} onClick={handleVisibility}>{btnName}</button>
        </li>
        <li>
          Link: {blog.url}
        </li>
        <li>
          Likes: {blogObject.likes}
          <button style={btnStyle} onClick={addLike}>Like</button>
        </li>
        <li>
          User: {blog.user.name}
        </li>
      </div>
    )
  }

}

export default Blog