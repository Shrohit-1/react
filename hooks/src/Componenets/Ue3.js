import React,{useState,useEffect} from 'react'

function Ue3() {
    const [count,setCount] = useState(0);
    const [txt,setTxt]= useState('');

    useEffect(()=>{
        console.log("useEffect");
        document.title=`Button clicked ${count} times`
    },[count]
    );
    console.log("render");
    return (
        
        <div>
          <h1>current Count {count}</h1>
          <button onClick={()=>setCount(count+1)}>+1</button>
          <input value={txt} onChange={(e)=>{setTxt(e.target.value)}}></input>
      </div>
    )
}

export default Ue3