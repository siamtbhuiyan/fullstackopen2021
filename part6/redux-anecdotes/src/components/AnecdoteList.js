import { useSelector, useDispatch } from 'react-redux'

import React from 'react'

const AnecdoteList = () => {
    let anecdotes = useSelector(state => state.anecodotes)
    const dispatch = useDispatch()

    const vote = (id, content) => {
      dispatch({ type: 'anecdotes/addVote', payload: id })
      const notification = `You voted for "${content}"`
      dispatch({ type: "notification/setNotification", payload: notification })
      setTimeout(() => {dispatch({ type:"notification/removeNotification" })}, 5000)
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList