import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./Like.css"
import { database } from '../firebase';
function Like({userData,postData}) {
    const [ like, setLike]= useState(null);
    useEffect(()=>{
        let check= postData.likes.includes(userData.userid)?true:false;
        setLike(check);
    },[postData])
    const handleLike= (e)=>{
        if(like==true){
            let narr=postData.likes.filter((user)=>{
                return user != userData.userid
            })
            database.posts.doc(postData.postId).update({
                likes:narr
            })
            setLike(false);
        }
        else{
            let narr= [...postData.likes, userData.userid];
            database.posts.doc(postData.postId).update({
                likes:narr
            })
            setLike(true);
        }
    }
  return (
    <div>
        {
            like!=null?
            <>
            {
                like==true?<FavoriteIcon className='icon-styling like' onClick={handleLike} />:<FavoriteIcon className='icon-styling unlike' onClick={handleLike} />
            }
            </>:
            <></>
        }
    </div>
  )
}

export default Like