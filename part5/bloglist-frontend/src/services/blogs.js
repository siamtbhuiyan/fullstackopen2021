import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.data
}

const remove = async (newObject) => {
  const response = await axios.delete(`${baseUrl}/${newObject.id}`, config)
  return response.data
}

const blogService = {
  getAll,
  create,
  setToken,
  update,
  remove
}

export default blogService