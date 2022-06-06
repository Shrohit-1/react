import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import "./Posts.css"
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Like2 from './Like2';
import Comment from './Comment';
import AddComment from './AddComment';



function Posts({userData}) {
  const[posts,setPosts]= useState(null);
  const [open, setOpen] =useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = (pId) => {
    setOpen(pId);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(()=>{
    let parr= [];
    const unsub= database.posts.orderBy('createdAt','desc').onSnapshot((querySnapShot)=>{
        parr=[];
        querySnapShot.forEach((doc) => {

            let data={...doc.data(),postId:doc.id}
            parr.push(data);
        });
        setPosts(parr);
    })
    return unsub;
  },[])

  const callback = (entries) => {
    entries.forEach((entry)=>{
        let ele = entry.target.childNodes[0]
        console.log(ele)
        ele.play().then(()=>{
            if(!ele.paused && !entry.isIntersecting){
                ele.pause()
            }
        })
    })
  }
  let observer = new IntersectionObserver(callback, {threshold:0.6});
  useEffect(()=>{
      const elements = document.querySelectorAll(".videos")
      elements.forEach((element)=>{
          observer.observe(element)
      })
      return ()=>{
          observer.disconnect();
      }
  },[posts])


  return (
      
      posts==null || userData==null ? <CircularProgress />:
      <div className='video-container'>
        {
          posts.map((post,index)=>(
            <React.Fragment key={index}>
              <div className='videos'>
                <Video src={post.pUrl}></Video>
                <div className='fa' style={{display:"flex"}}>
                  <Avatar src={post.uProfile} />
                  <h4>{post.uName}</h4>
                </div>
                <Like userData={userData} postData={post}></Like>
                <CommentIcon className='chat-styling' onClick={()=>{handleClickOpen(post.pId)}}/>
                <Dialog
                  fullScreen={fullScreen}
                  open={open==post.pId}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                  fullWidth={true}
                  maxWidth="md"
                >
                  <div className='modal-container' style={{overflow:"clip"}}>
                    <div className='video-modal' >
                      <video src={post.pUrl} autoPlay={true} muted={true} controls className="modal-video"></video>
                    </div>
                    <div className='comment-modal'>
                      <Card className="card1" sx={{overflow:"scroll"}}>
                        <Comment postData={post}></Comment>
                      </Card>
                      <Card variant='outlined'  className="card2">
                          <Typography style={{padding:"0.5rem",textAlign:"center"}} variant="body2">
                            {post.likes.length==0?'':`Liked By ${post.likes.length} users`}
                          </Typography>
                          <div style={{display:"flex" , alignItems:"center", justifyContent:"space-around"}}>
                            <Like2 userData={userData} postData={post}></Like2>
                            <AddComment userData={userData} postData={post}></AddComment>
                          </div>
                      </Card>
                    </div>
                  </div> 
                </Dialog>
              </div>
            </React.Fragment>
          ))
        }
      </div>
      
  )
}

export default Posts