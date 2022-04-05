import { useSelector, useDispatch } from 'react-redux'

import React from 'react'

const AnecdoteList = () => {
    let anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
      dispatch({ type: 'anecdotes/addVote', payload: id })
    }

  const byVotes = (a, b) => b.votes - a.votes

  return (
    <div>
        <br />
        <br />
    {anecdotes.slice().sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList