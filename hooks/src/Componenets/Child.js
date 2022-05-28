import React, { useContext } from 'react'
import parentContext from './parentContext'
function Child() {
    const val= useContext(parentContext);
    console.log(val);
  return (
    <div>Child</div>
  )
}

export default Child