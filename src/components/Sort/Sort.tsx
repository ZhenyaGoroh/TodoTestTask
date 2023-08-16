import React from "react"
import s from "./Sort.module.scss"

function Sort({
  title,
  isActive,
  setSorting,
  value,
}: {
  value: "ALL" | "ACTIVE" | "COMPLETED"
  title: "All" | "Active" | "Completed"
  isActive: boolean
  setSorting: (s: "ALL" | "ACTIVE" | "COMPLETED") => void
}) {
  return (
    <button
      style={isActive ? { border: "1px solid #50c878" } : {}}
      className={s.btn}
      type="button"
      onClick={() => setSorting(value)}
    >
      {title}
    </button>
  )
}

export default React.memo(Sort)
