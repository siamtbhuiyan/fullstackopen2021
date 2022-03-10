import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('Test for checking the BlogForm component', () => {
    const mockCreateBlog = jest.fn()
    test("checks that the form calls the event handler it received as props with the right details when a new blog is created", () => {
        render(<BlogForm createBlog={mockCreateBlog}/>)
        const titleInput = screen.getByPlaceholderText('Enter Title')
        const authorInput = screen.getByPlaceholderText('Enter Author')
        const urlInput = screen.getByPlaceholderText('Enter Url')
        const button = screen.getByText('create')

        userEvent.type(titleInput, "Testing Create Blog")
        userEvent.type(authorInput, "John Doe")
        userEvent.type(urlInput, "https://localhost:3000")
        userEvent.click(button)

        expect(mockCreateBlog.mock.calls).toHaveLength(1)
        expect(mockCreateBlog.mock.calls[0][0].title).toBe("Testing Create Blog")
        expect(mockCreateBlog.mock.calls[0][0].author).toBe("John Doe")
        expect(mockCreateBlog.mock.calls[0][0].url).toBe("https://localhost:3000")
    })
})