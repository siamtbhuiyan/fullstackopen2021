import { useState } from 'react'
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'

import {
  Routes,
  Route,
  useNavigate,
  useMatch
} from "react-router-dom"

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const navigate = useNavigate()

  const addNew = (anecdote) => {
    console.log(anecdote)
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`You created "${anecdote.content}"`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate("/")
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch("anecdotes/:id")

  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

  return (
    <div>
      <Menu />
      <div>{notification}</div>
      <Routes>
        <Route path="anecdotes/:id" element={<Anecdote anecdote={anecdote} vote={vote} />}/>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path="/create" element={<CreateNew addNew={addNew}/>}/>
        <Route path="/about" element={<About />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
