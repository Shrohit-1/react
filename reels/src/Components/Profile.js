import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { database } from '../firebase'
import { CircularProgress } from '@mui/material';
import Navbar from './Navbar' 
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Like2 from './Like2';
import Comment from './Comment';
import AddComment from './AddComment';
import "./profile.css"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ProfileDetail from './ProfileDetail';
import profileBackground from "../Assets/green-geo-background-banner.jpeg"
function Profile() {
    const{id}= useParams()
    const [userData,setUserData]= useState(null);
    const [posts,setPosts]= useState(null)
    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserData(snap.data());
        })   
    },[id])

    useEffect(()=>{
        if(userData!=null){
            let fetchData=async()=>{
                let parr = [];
                for(let i=0;i<userData.postIds.length;i++){
                    let postData = await database.posts.doc(userData.postIds[i]).get();
                    parr.push({...postData.data(),postId:postData.id});
                }
                setPosts(parr);
            }
            fetchData();
        }
    })
    const [open, setOpen] =useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = (pId) => {
        setOpen(pId);
    };

    const handleClose = () => {
        setOpen(null);
    };
  return (
    <>
        {
            posts==null || userData==null ? <CircularProgress />:
            <div>
                <Navbar></Navbar>
                
                <div className="upper-part" style={{backgroundImage: `url(${profileBackground})`}}>
                        <div className="profile-img">
                            <img src={userData.profileUrl}/>
                        </div>
                        <div className="info">
                            <ProfileDetail userData={userData}></ProfileDetail>
                        </div>
                </div>
                <div className='post-video-container' style={{background:"black" , paddingTop:"3rem" , paddingBottom:"1rem"}}>
                    {
                    posts.map((post,index)=>(
                        <React.Fragment key={index}>
                        <div className='post-videos'>
                            <video src={post.pUrl} onClick={()=>{handleClickOpen(post.pId)}} muted={true} className="modal-video"></video>
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
                                <video src={post.pUrl} autoPlay={true} muted={true} controls className="modal-video"></video>
                                </div>
                                <div className='comment-modal'>
                                <Card className="card1">
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
            </div>
        }
    </>
  )
}

export default Profile