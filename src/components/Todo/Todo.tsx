/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from "react"
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im"
import ITodo from "../../types/ITodo"
import s from "./Todo.module.scss"
import { useTodo } from "../../store/useTodo"

function Todo({
  todo,
  isBeingEdited,
  setEditingTodoId,
}: {
  todo: ITodo
  isBeingEdited: boolean
  setEditingTodoId: (id: string | null) => void
}) {
  const { toggleTodoStatus, updateText } = useTodo()
  const [isEditing, setIsEditing] = useState<boolean>(isBeingEdited)
  const [title, setTitle] = useState<string>(todo.title)

  const handleTitleChange = () => {
    updateText(title, todo.id)
    setIsEditing(false)
    setEditingTodoId(null)
  }

  return (
    <div className={s.todo}>
      <div className={s.todo__status}>
        <button
          type="button"
          className={s.todo__btn}
          onClick={() => toggleTodoStatus(todo.id)}
        >
          {todo.completed ? (
            <ImCheckboxChecked color="#50c878" size={20} />
          ) : (
            <ImCheckboxUnchecked size={20} />
          )}
        </button>
      </div>

      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(key) =>
            key.key === "Enter" &&
            title.trim().length > 0 &&
            handleTitleChange()
          }
          className={s.todo__input}
          autoFocus
          maxLength={20}
        />
      ) : (
        <span
          onClick={() => {
            setIsEditing(true)
            setEditingTodoId(String(todo.id))
          }}
          className={s.todo__title}
          style={todo.completed ? { textDecoration: "line-through" } : {}}
        >
          {todo.title}
        </span>
      )}
    </div>
  )
}

export default Todo
