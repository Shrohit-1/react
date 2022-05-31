import * as React from 'react';
import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Signup.css'
import instagram from '../Assets/Instagram.jfif'
import { createUseStyles } from 'react-jss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link ,useNavigate} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { storage,database } from '../firebase';
export default function Signup() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [file,setFile]=useState(null);
    const [name,setName]=useState('');
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();
    const {signup}= useContext(AuthContext);
    const useStyles= createUseStyles({
        text1:{
            color:'grey',
            textAlign:'center',
            margin:"3%",
            width:"100%"
        },
        card2:{
            margin:"3%",
            height:"7vh"
        }
    })
    const classes= useStyles();

    const handleClick= async()=>{
        if(file==null){
            setError("Please Upload Profile Image First");
            setTimeout(()=>{
                setError('')
            },2000);
            return;
        }
        try{
            setError('');
            setLoading(true);
            let userObj=await signup(email,password);
            let uid= userObj.user.uid;
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error){
                
                setError(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false);
                return;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    database.users.doc(uid).set({
                        email:email,
                        userid:uid,
                        fullName:name,
                        profileUrl:url,
                        createdAt:database.getTimeStamp()
                    })
                })
                setLoading(false);
                navigate("/");
            }
            
        }
        catch(err){
            setError(err);
            setTimeout(()=>{
                setError('');
            },2000);
        }
    }

  return (
      <div className='cardWrapper'>
          <div className='signupCard'>
            <Card variant="outlined">
                <div className='instaLogo'><img  src={instagram} ></img></div>
              
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        Sign up to see photos and videos from your friends
                    </Typography>
                    {error!='' && <Alert severity="error" >{error}</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <TextField id="outlined-basic" label="Full-Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    <Button size="small" variant="outlined" fullWidth={true} margin="dense" color='secondary' startIcon={<CloudUploadIcon/>}  component="label">
                        Upload Profile Image
                        <input type="file" accept="image/*" hidden onChange={(e)=>{setFile(e.target.files[0])}}></input>   
                    </Button>
                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth={true} margin="dense" color='primary' disabled={loading} onClick={handleClick} >Sign-Up</Button>
                </CardActions>
                <Typography className={classes.text1} variant="subtitle1">
                        By signing up you agree to our Terms, Data Policy and Cookies Policy
                </Typography>
            </Card>
            <Card variant="outlined" className={classes.card2}>
                 <Typography className={classes.text1} variant="subtitle1">
                    Already Have An Account <Link to="/login"> Login</Link>
                </Typography>
            </Card>
          </div>
      </div>
    
  );
}
