import React,{useState,useEffect} from 'react'
import { auth } from '../firebase'
//123456 -> password
//email-> shrohit@gmail.com
function Authorization() {
  
  const [email,setEmail]= useState('');
  const[password,setPass]=useState('');
  const [user,setUser]= useState('');

  let create= async()=>{
    let res=await auth.createUserWithEmailAndPassword(email,password);
    console.log(res);
  }
  
  let login= async()=>{
      await auth.signInWithEmailAndPassword(email,password);
  }

  let logout= async()=>{
      auth.signOut();
  }

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
        setUser(user);
    })
  },[])
  return (
      <>{
          user==null?
          <div>
          <label>Email</label>
          <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
          <label>Password</label>
          <input type='password' value={password} onChange={(e)=>{setPass(e.target.value)}}></input>
          <button onClick={()=>login()}>Sign-in</button>:
          </div>:
          <div>
              {user.email}
              <button onClick={()=>logout()}>Log-out</button>
          </div>
      }
        
      </>
    
  )
}

export default Authorization