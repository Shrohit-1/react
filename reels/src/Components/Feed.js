import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile';

import Button from '@mui/material/Button';
import {database} from "../firebase"
import Posts from './Posts';
import Navbar from './Navbar';
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
    <>
      <Navbar userData={userData}></Navbar>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <div className='action-button' style={{display:"flex", justifyContent:"space-around" ,width:"100%", alignItems:"center", paddingTop:"1.7vh", paddingBottom:"1.7vh",backgroundColor:"black" }} >
          <UploadFile user={userData}></UploadFile>
          {/* <Button variant="contained" onClick={logout} style={{width:"10vw"}}>logout &nbsp;<LogoutIcon></LogoutIcon></Button> */}
        </div>
          <Posts userData={userData}/>
      </div>
    </>
  )
}

export default Feed