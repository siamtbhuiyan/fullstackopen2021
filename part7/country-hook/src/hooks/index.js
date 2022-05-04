import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios
          .get(`https://restcountries.com/v3.1/name/${name}`)
          .then(response => {
              console.log(response.data[0])
            setCountry(response.data[0])
          }).catch(error => console.log(error))
      }, [name])

    if (name === '') {
        return null
    }

    if (country) {
        return country
    } else {
        return null
    }
  }