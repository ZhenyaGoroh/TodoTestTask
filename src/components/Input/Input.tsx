import React, { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { v4 as uuidv4 } from "uuid"
import s from "./Input.module.scss"
import { useTodo } from "../../store/useTodo"

function Input() {
  const [title, setTitle] = useState<string>("")

  const { addTodo } = useTodo()

  const handleAddTodo = () => {
    addTodo({ userId: 1, id: uuidv4(), title, completed: false })
    setTitle("")
  }
  return (
    <div className={s.input}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Your ToDo"
        className={s.input__field}
        maxLength={20}
        onKeyDown={(key) =>
          key.key === "Enter" && title.trim().length > 0 && handleAddTodo()
        }
      />
      <button
        disabled={title.length === 0}
        type="button"
        className={s.input__btn}
        onClick={() => handleAddTodo()}
      >
        <IoMdAddCircle color="#50c878" size={30} />
      </button>
    </div>
  )
}

export default Input
