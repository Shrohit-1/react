import React,{useState,useContext} from 'react'
import Child from './Child'
import context from './Context'
import parentContext from './parentContext';
function Parent1() {
    const val= useContext(context);
    const [theme,setTheme]= useState(false);
  return (
      <parentContext.Provider value={theme}>
        <div className={val==true?"dark":"light"} onClick={()=>setTheme(!theme)}>Parent1
            <Child></Child>
        </div>
    </parentContext.Provider>
  )
}

export default Parent1