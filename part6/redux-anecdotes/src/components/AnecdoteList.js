import { useSelector, useDispatch } from 'react-redux'

import React from 'react'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const filteredanecdotes = useSelector(state => state.filter)
    const regex = new RegExp( filteredanecdotes, 'i' )

    const filteranecdotes = (anecdotes, filteredanecdotes, regex) => {
      if (filteredanecdotes === "") {
        return anecdotes
      } else {
        return anecdotes.filter(anecdotes => anecdotes.content.match(regex))
      }
    }

    const anecdotesList = filteranecdotes(anecdotes, filteredanecdotes, regex)

    const vote = (id, content) => {
      dispatch({ type: 'anecdotes/addVote', payload: id })
      const notification = `You voted for "${content}"`
      dispatch({ type: "notification/setNotification", payload: notification })
      setTimeout(() => {dispatch({ type:"notification/removeNotification" })}, 5000)
    }

  const byVotes = (a, b) => b.votes - a.votes

  return (
    <div>
    {anecdotesList.slice().sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList