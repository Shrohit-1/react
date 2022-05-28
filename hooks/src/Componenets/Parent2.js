import { useContext } from "react"
import React from 'react'
import context from "./Context"

function Parent2() {
    const val= useContext(context);
  return (
    <div className={val==true?"dark":"light"} >Parent2</div>
  )
}

export default Parent2