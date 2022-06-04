import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./AddComment.css"
import { database } from '../firebase';
function AddComment({userData,postData}) {
    const[text,setText]= useState('');

    const handleClick= async()=>{
        let obj={
            text:text,
            Uname:userData.fullName,
            UProfileImg:userData.profileUrl
        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments,doc.id]
            })
        })
        setText('')
    }
    return (
        <>
            <TextField id="outlined-basic" size='small' variant="outlined" sx={{width:'70%'}} value={text} onChange={(e)=>{setText(e.target.value)}} />
            <Button variant="contained" onClick={handleClick}>post</Button>
        </>
    )
}

export default AddComment