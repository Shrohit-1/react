import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import {database} from "../firebase"
function Feed() {

  const {logout,User} = useContext(AuthContext);
  console.log(User);
  const [userData,setUserData]= useState('');
  useEffect(()=>{
    const unsub = database.users.doc(User.uid).onSnapshot((snapshot)=>{
          setUserData(snapshot.data())
      })
      return ()=> {unsub()}
    },[User])
      
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between" ,width:"50%", alignItems:"center" ,height:"100%"}}>
        <h1>Welcome</h1>
        
        <UploadFile user={userData}></UploadFile>
        <Button variant="contained" onClick={logout} style={{margin:"4rem"}} >logout &nbsp;<LogoutIcon></LogoutIcon></Button>
    </div>
    
  )
}

export default Feed