import React from "react"
import { BiLoaderAlt } from "react-icons/bi"
import s from "./Loader.module.scss"

function Loader() {
  return (
    <div>
      <BiLoaderAlt className={s.loader} size={30} color="#50c878" />
    </div>
  )
}

export default Loader
