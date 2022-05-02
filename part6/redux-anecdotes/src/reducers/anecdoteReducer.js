import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdotes, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdotes = (content) => {
  return async dispatch => {
    const object = await anecdoteService.create(content)
    dispatch(appendAnecdotes(object))
  }
}

export const addVotes = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.find(a => a.id === id)
    const votedAnecdote = await anecdoteService.vote(anecdoteToVote, id)
    const updated = anecdotes.map(anecdote => 
      anecdote.id !== id ? anecdote : votedAnecdote
    )
    dispatch(setAnecdotes(updated))
  }
}

export default anecdoteSlice.reducer
