import React, { useLayoutEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import s from "./App.module.scss"
import Input from "./components/Input/Input"
import { useTodo } from "./store/useTodo"
import Todo from "./components/Todo/Todo"
import Footer from "./components/Footer/Footer"
import Loader from "./components/Loader/Loader"
import ITodo from "./types/ITodo"

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setTodos } = useTodo()
  useLayoutEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => response.json())
      .then((data: ITodo[]) => {
        setTodos(data.slice(0, 5))
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false))
  }, [])
  const { todos } = useTodo()
  const [sorting, setSorting] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ALL")
  return (
    <div className={s.todo}>
      <header className={s.todo__header}>ToDo list</header>
      <Input />
      {isLoading ? (
        <Loader />
      ) : (
        todos
          .filter((todo) => {
            if (sorting === "ALL") return todo
            if (sorting === "ACTIVE") {
              return todo.completed === false
            }
            return todo.completed === true
          })
          .map((todo) => <Todo key={uuidv4()} todo={todo} />)
      )}
      <Footer
        active={todos.filter((todo) => todo.completed === false).length}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  )
}

export default App
