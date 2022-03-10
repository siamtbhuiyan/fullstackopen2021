import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Test for checking the blog component', () => {
  const blog = {
    title: 'Testing Blog',
    author: 'Frontend Tester',
    id: "61e46890f9fbe8cae9bb0e23",
    likes: 34,
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: {
        id: "61e0310656d0f66a84e79436",
        name: "Superuser",
        username: "root"
    }
  }

  const mockUpdateLikes = jest.fn()
  const mockDeleteBlog = jest.fn()
  const mockUser = jest.fn()

  test("checks that the component displaying a blog renders the blog's title and author", () => {  
    const component  = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog}/>)
    expect(component.container).toHaveTextContent('Testing Blog Frontend Tester')
  })
  test("checks that the blog's url and number of likes are shown when the button controlling the shown details has been clicked", () => {
    const component  = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} user={mockUser}/>)
    const button = screen.getByText('view')
    userEvent.click(button)
    expect(component.container).toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    expect(component.container).toHaveTextContent('34')
  })
})
