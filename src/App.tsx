import React from "react"
import { v4 as uuidv4 } from "uuid"
import s from "./App.module.scss"
import Input from "./components/Input/Input"
import { useTodo } from "./store/useTodo"
import Todo from "./components/Todo/Todo"

function App() {
  const { todos } = useTodo()
  return (
    <div className={s.todo}>
      <header className={s.todo__header}>ToDo list</header>
      <Input />
      {todos.map((todo) => (
        <Todo key={uuidv4()} todo={todo} />
      ))}
    </div>
  )
}

export default App
