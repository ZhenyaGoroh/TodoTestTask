/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from "react"
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

  const ref = useRef<HTMLInputElement>(null)
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos?_limit=5")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data: ITodo[]) => {
        setTodos(data.slice(0, 5))
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => setIsLoading(false))

    window.addEventListener("click", (e) => {
      const target = e.target as HTMLElement

      if (target?.nodeName === "path" || target?.nodeName === "svg") {
        setEditingTodoId(null)
        ref.current?.blur()
        return
      }

      if (
        target !== ref.current &&
        target?.nodeName !== "SPAN" &&
        !target?.className.includes("_todo__title")
      ) {
        setEditingTodoId(null)
        ref.current?.blur()
      }
    })
  }, [])
  const { todos } = useTodo()
  const [sorting, setSorting] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ALL")

  const filteredTodos = todos.filter((todo) => {
    if (sorting === "ALL") return todo
    if (sorting === "ACTIVE") {
      return todo.completed === false
    }
    return todo.completed === true
  })

  return (
    <div className={s.todo}>
      <header className={s.todo__header}>ToDo list</header>
      <Input />
      {isLoading ? (
        <Loader />
      ) : filteredTodos.length === 0 ? (
        <div className={s.todo__empty}>
          {sorting === "ALL" && "You have no todos"}
          {sorting === "ACTIVE" && "You have no active todos"}
          {sorting === "COMPLETED" && "You have no completed todos"}
        </div>
      ) : (
        filteredTodos.map((todo) => (
          <Todo
            key={uuidv4()}
            todo={todo}
            isBeingEdited={editingTodoId === String(todo.id)}
            setEditingTodoId={setEditingTodoId}
            ref={ref}
          />
        ))
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
