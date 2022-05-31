import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import LinearProgress from '@mui/material/LinearProgress';
import {database, storage} from "../firebase"
import {v4 as uuidv4} from 'uuid'


function UploadFile(props) {
    const [error,setError]= useState('');
    const [loading,setLoading]= useState(false);
    
    let handleChange = (file)=>{
        if(file==null){
            setError("select a file to upload");
            setTimeout(()=>{
                setError('');
            },3000);
        }
        if(file.size/(1024*1024)>100){
            setError("File size must be less than 100mb");
            setTimeout(()=>{
                setError('');
            },3000);
        }
        let uid = uuidv4();
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('')
                },3000);
                setLoading(false)
                return;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    let obj = {
                        likes:[],
                        comments:[],
                        pId:uid,
                        pUrl:url,
                        uName : props.user.fullName,
                        uProfile : props.user.profileUrl,
                        userId : props.user.userid,
                        createdAt : database.getTimeStamp()
                    }
                    database.posts.add(obj).then(async(ref)=>{
                        let res = await database.users.doc(props.user.userid).update({
                            postIds : props.user.postIds!=null ? [...props.user.postIds,ref.id] : [ref.id]
                        })
                    }).then(()=>{
                        setLoading(false)
                    }).catch((err)=>{
                        setError(err)
                        setTimeout(()=>{
                            setError('')
                        },3000)
                        setLoading(false)
                    })
                })
        }
    }
    return (
            <div >
                {
                    error!=''? <Alert severity="error">{error}</Alert>:
                    <>
                        <input type="file" accept='video/*' id="upload-input" style={{display:"none"}} onChange={(e)=>{handleChange(e.target.files[0])}} ></input>
                        <label htmlFor='upload-input' >
                            <Button variant="contained" component="span" disabled={loading}>
                                <VideocamIcon></VideocamIcon> &nbsp; Upload Video
                            </Button>
                        </label>
                        {loading && <LinearProgress style={{margin:"0.25rem"}} />}
                    </> 
                }
            </div>
    )
}

export default UploadFile