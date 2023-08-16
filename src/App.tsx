import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import s from "./App.module.scss"
import Input from "./components/Input/Input"
import { useTodo } from "./store/useTodo"
import Todo from "./components/Todo/Todo"
import Footer from "./components/Footer/Footer"

function App() {
  const { todos } = useTodo()
  const [sorting, setSorting] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ALL")
  return (
    <div className={s.todo}>
      <header className={s.todo__header}>ToDo list</header>
      <Input />
      {todos.map((todo) => (
        <Todo key={uuidv4()} todo={todo} />
      ))}
      <Footer
        active={todos.filter((todo) => todo.completed === false).length}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  )
}

export default App
