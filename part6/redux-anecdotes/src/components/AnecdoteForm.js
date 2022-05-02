import { connect } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    const addAnecdotes = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""
        props.createAnecdotes(content)
        props.showNotification(`You added "${content}"`, 5)
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

const mapsDispatchToProp = {
  createAnecdotes,
  showNotification
}

export default connect(null, mapsDispatchToProp)(AnecdoteForm)