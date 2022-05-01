import { useDispatch } from "react-redux";
import React from 'react'
import { createAnecdotes } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdotes = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""
        dispatch(createAnecdotes(content))
        dispatch(showNotification(`You added "${content}"`, 5))
    }
    
  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdotes}>
            <div><input name="anecdote"/></div>
            <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm