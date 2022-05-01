import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdotes(state, action) {
      const content = action.payload
      state.push({
        content,
        // id: getId(),
        votes: 0
      })
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdotes, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
