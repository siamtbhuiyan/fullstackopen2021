const Anecdote = ({ anecdote, vote }) => (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}</div>
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
)

export default Anecdote