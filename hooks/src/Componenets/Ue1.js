import React,{useState,useEffect} from 'react'

function Ue1() {
    const [count,setCount] = useState(0);
    useEffect(()=>{
        console.log("useEffect");
        document.title=`Button clicked ${count} times`
    },//Additional dependency Array
    )
    console.log("render");
    return (
        
        <div>
          <h1>current Count {count}</h1>
          <button onClick={()=>setCount(count+1)}>+1</button>
      </div>
    )
}

export default Ue1