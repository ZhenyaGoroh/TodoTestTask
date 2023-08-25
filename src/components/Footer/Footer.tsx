import React from "react"
import { useTodo } from "../../store/useTodo"
import s from "./Footer.module.scss"
import Sort from "../Sort/Sort"

function Footer({
  active,
  sorting,
  setSorting,
}: {
  active: number
  sorting: "ALL" | "ACTIVE" | "COMPLETED"
  setSorting: (s: "ALL" | "ACTIVE" | "COMPLETED") => void
}) {
  const { deleteCompleted } = useTodo()

  return (
    <div className={s.footer}>
      <span>Items left: {active}</span>
      <span className={s.footer__btns}>
        <Sort
          title="All"
          isActive={sorting === "ALL"}
          setSorting={setSorting}
          value="ALL"
        />
        <Sort
          title="Active"
          isActive={sorting === "ACTIVE"}
          setSorting={setSorting}
          value="ACTIVE"
        />
        <Sort
          title="Completed"
          isActive={sorting === "COMPLETED"}
          setSorting={setSorting}
          value="COMPLETED"
        />
      </span>
      <button
        onClick={() => deleteCompleted()}
        className={s.footer__delete}
        type="button"
      >
        Delete completed
      </button>
    </div>
  )
}

export default Footer
