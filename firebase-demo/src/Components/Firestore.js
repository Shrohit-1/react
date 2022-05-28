import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
function Firestore() {
  const [name,setName]= useState('');
  const [age,setAge]= useState('');

  let createUserInDB= async()=>{
     await database.users.add({name,age});//create Command
  }

  let update= async()=>{
      let uid='vOy66UdWRvHUtfTvBqG1';
    await database.users.doc(uid).update({name,age})
  }

  let Delete= async()=>{
    let uid='NBKpiDxJRPYwLLslQH8G';
    await database.users.doc(uid).delete();
  }

  useEffect(() => {
      //read
    async function fetchData() {
      //let data= await database.users.doc('vOy66UdWRvHUtfTvBqG1').get(); //particular entry
      //let data = await database.users.orderBy('createdAt','desc').get(); //onSnapshot()
      let data= await database.users.get();
      let count=0;
      data.forEach((obj)=>{console.log(obj.data(),count); count++;});
    }
    fetchData();
  },[])

  return (
    <div>
        <label>Name</label>
        <input type='text' value={name} onChange={(e)=>setName(e.target.value)}></input>
        <label>Age</label>
        <input type='number' value={age} onChange={(e)=>{setAge(e.target.value)}}></input>
        <button onClick={()=>{createUserInDB()}}>Create</button>
        <button onClick={()=>{update()}}>Update</button>
        <button onClick={()=>{Delete()}}>Delete</button>
    </div>
  )
}

export default Firestore