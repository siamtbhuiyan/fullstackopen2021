import { useField } from "../hooks"

const CreateNew = ({ addNew }) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
 
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content[0].value,
        author: author[0].value,
        info: info[0].value,
        votes: 0
      })
    }
  
    const handleReset = (e) => {
      e.preventDefault()
      content[1]()
      author[1]()
      info[1]()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name="content" {...content[0]} />
          </div>
          <div>
            author
            <input name="author" {...author[0]} />
          </div>
          <div>
            url for more info
            <input name="info" {...info[0]} />
          </div>
          <button>create</button>
          <button type="reset" onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  }

export default CreateNew