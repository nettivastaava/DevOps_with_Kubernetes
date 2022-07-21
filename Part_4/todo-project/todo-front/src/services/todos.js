import axios from 'axios'
const baseUrl = 'http://localhost:8081/api/todos'

const getAllTodos = () => {
  return axios.get(baseUrl)
}

const createTodo = newObject => {
  return axios.post(baseUrl, newObject)
}

const updateTodo = async updatedTodo => {
  await axios.put(`${baseUrl}/${updatedTodo.id}`, updatedTodo)
}

export default {
  getAllTodos: getAllTodos,
  createTodo: createTodo,
  updateTodo: updateTodo,
}