import React,{useContext} from 'react'
import context from "./Context"

function NavBar() {
    const val = useContext(context);
  return (
    <div className={val==true?"dark":"light"} >NavBar</div>
  )
}

export default NavBar