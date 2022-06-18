import React, { useState, useEffect } from 'react'
import todoService from './services/todos'

const App = () => {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')

  useEffect(() => {
    todoService
      .getAllTodos()
      .then(response => {
        setTodos(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    setTodoText('')
  }

  return (
    <div>
      <h2>TODOS</h2>
      <ol>
      {todos?.map(todo => (
        <li>
          {todo}
        </li>
      ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <textarea id="w3review" value={todoText} onChange={({ target }) => setTodoText(target.value)} name="w3review" rows="4" cols="50" maxlength="140"></textarea>
        <div>
          <button type="submit">Submit todo</button>
        </div>     
     </form>
    </div>
  )
}

export default App;
