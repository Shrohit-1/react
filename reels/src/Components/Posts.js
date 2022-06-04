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
                  <div className='modal-container'>
                    <div className='video-modal'>
                      <Video src={post.pUrl}></Video>
                    </div>
                    <div className='comment-modal'>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="/static/images/cards/contemplative-reptile.jpg"
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Lizard
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Share</Button>
                          <Button size="small">Learn More</Button>
                        </CardActions>
                      </Card>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="/static/images/cards/contemplative-reptile.jpg"
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Lizard
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Share</Button>
                          <Button size="small">Learn More</Button>
                        </CardActions>
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