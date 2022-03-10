import React, { useState } from 'react'
import PropTypes from 'prop-types';

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
                <form onSubmit={addBlog} className="createForm">
                    <div>
                    title:
                    <input type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange}
                    placeholder="Enter Title" />
                    </div>
                    <div>
                    author:
                    <input type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange} 
                    placeholder="Enter Author" />
                    </div>
                    <div>
                    url:
                    <input type="text"
                    value={url}
                    name="Url"
                    onChange={handleUrlChange} 
                    placeholder="Enter Url"/>
                    </div>
                    <button type='submit'>create</button>
                </form>
            </div>
      </div>
  );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm;
