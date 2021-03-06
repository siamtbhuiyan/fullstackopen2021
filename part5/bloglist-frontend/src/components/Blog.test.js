import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Test for checking the blog component', () => {
  const blog = {
    title: 'Testing Blog',
    author: 'Frontend Tester',
    id: '61e46890f9fbe8cae9bb0e23',
    likes: 34,
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: {
      id: '61e0310656d0f66a84e79436',
      name: 'Superuser',
      username: 'root'
    }
  }

  const mockUpdateLikes = jest.fn()
  const mockDeleteBlog = jest.fn()
  const mockUser = jest.fn()

  test('checks that the component displaying a blog renders the blog\'s title and author', () => {
    const component  = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog}/>)
    expect(component.container).toHaveTextContent('Testing Blog Frontend Tester')
  })
  test('checks that the component does not render its url or number of likes by default', () => {
    render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog}/>)
    const urlElement = screen.queryByText('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    const likeElement = screen.queryByText('34')
    expect(urlElement).toBeNull()
    expect(likeElement).toBeNull()
  })
  test('checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const component  = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} user={mockUser}/>)
    const button = screen.getByText('view')
    userEvent.click(button)
    expect(component.container).toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    expect(component.container).toHaveTextContent('34')
  })
  test('ensures that if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const component  = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} user={mockUser}/>)
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)
    const likeButton = screen.getByText('Like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)
    expect(mockUpdateLikes.mock.calls).toHaveLength(2)
  })
})
