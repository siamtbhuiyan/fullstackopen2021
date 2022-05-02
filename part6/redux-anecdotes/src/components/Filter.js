import { connect } from "react-redux"
import { filterAnecdotes } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        props.filterAnecdotes(filter)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapsDispatchToProp = {
    filterAnecdotes
  }
  
  export default connect(null, mapsDispatchToProp)(Filter)