import { Avatar } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
function Comment({postData}) {

    const[comments,setComments]=useState(null);

    useEffect(()=>{
        async function fetchData() {
            let arr = []
            for(let i=0;i<postData.comments.length;i++){
                let data = await database.comments.doc(postData.comments[i]).get()
                arr.push(data.data())
            }
            setComments(arr)
        }
        fetchData();
    },[postData])

  return (
    <>
    {
        comments==null? <CircularProgress/> :
        <>
        {
            comments.map((comment,index)=>(
                <div style={{display:'flex'}}>
                    <Avatar  src={comment.UProfileImg}/>
                    <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                </div>
            ))
        }
        </>
    }
    </>
  )
}

export default Comment