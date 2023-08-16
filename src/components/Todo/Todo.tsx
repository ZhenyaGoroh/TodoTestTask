/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react"
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im"
import ITodo from "../../types/ITodo"
import s from "./Todo.module.scss"
import { useTodo } from "../../store/useTodo"

function Todo({ todo }: { todo: ITodo }) {
  const { toggleTodoStatus, updateText } = useTodo()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(todo.title)

  const handleTitleChange = () => {
    updateText(title, todo.id)
    setIsEditing(false)
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
          style={todo.completed ? { textDecoration: "line-through" } : {}}
          onClick={() => setIsEditing(true)}
          className={s.todo__title}
        >
          {todo.title}
        </span>
      )}
    </div>
  )
}

export default React.memo(Todo)
