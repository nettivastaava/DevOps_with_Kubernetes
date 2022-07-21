import React from 'react'
import todoService from '../services/todos'


const Todo = ({ todo, todos, setTodos }) => {
  console.log('todo ', todo)

  const checkTodo = () => {
    console.log('todo checked')

    const updatedTodo = {
      ...todo,
      done: !todo.done
    }

    console.log('updated ', updatedTodo)

    todoService
      .updateTodo(updatedTodo)
      .then(
        setTodos(todos.map(mappedTodo => mappedTodo.id === todo.id ? updatedTodo : mappedTodo))
      )
  }


  return (
    <li>{todo.text}<input type="checkbox" checked={todo.done} onChange={checkTodo}></input></li>
  )
}

export default Todo