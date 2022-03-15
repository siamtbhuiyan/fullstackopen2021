import { useDispatch } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";
import React from 'react'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdotes = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""
        dispatch(createAnecdotes(content))
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