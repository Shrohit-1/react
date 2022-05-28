import React,{useState} from 'react'

function Us() {
    const [count,setCount] = useState(0);

    return (
      <div>
          <h1>current Count {count}</h1>
          <button onClick={()=>setCount(count+1)}>+1</button>
      </div>
    )
}

export default Us