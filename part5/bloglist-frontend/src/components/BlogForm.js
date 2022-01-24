import React, { useState } from 'react'

const BlogForm = ({
    createBlog
}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const addBlog = (e) => {
        e.preventDefault()
        const blogObject = {
              title: title,
              author: author,
              url: url
        }
        createBlog(blogObject)
        setTitle('')
        setAuthor('')
        setUrl('')
    } 

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
    }
    const handleUrlChange = (e) => {
        setUrl(e.target.value)
    }

  return (
      <div>
          <h3>Create New</h3>
            <div>
                <form onSubmit={addBlog}>
                    <div>
                    title:
                    <input type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange} />
                    </div>
                    <div>
                    author:
                    <input type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange} />
                    </div>
                    <div>
                    url:
                    <input type="text"
                    value={url}
                    name="Url"
                    onChange={handleUrlChange} />
                    </div>
                    <button type='submit'>create</button>
                </form>
            </div>
      </div>
  );
};

export default BlogForm;
