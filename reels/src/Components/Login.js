import * as React from 'react';
import { useContext,useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Login.css'
import instagram from '../Assets/Instagram.JPG'
import { createUseStyles } from 'react-jss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';
import insta from '../Assets/insta.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'
import { AuthContext } from '../Context/AuthContext';

export default function Login() {

    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');
    const[loading,setLoading]= useState(false);
    const {login}=useContext(AuthContext);
    const [error,setError]= useState('');
    const navigate= useNavigate();

    const useStyles= createUseStyles({
        text1:{
            color:'grey',
            textAlign:'center',
        },
        card2:{
            margin:"3%",
            height:"4vh"
        }
    })
    const classes= useStyles();

    var settings = {
        dots: false,
        autoplay:true,
        autoplaySpeed:1500,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: true,
        fade:true
    };
    const handleClick= async()=>{
        try{
            setError('');
            setLoading(true);
            let res= await login(email,password);
            console.log(res);
            setLoading(false);
            navigate('/');
        }
        catch(err){
            setError(err);
            setLoading(false);
            setTimeout(()=>{
                setError('');
            },2000)
            setLoading(false);
        }
    }
  return (
      <div className='cardWrapper'>
          <div className='imgcar' style={{backgroundImage:'url('+insta+')', backgroundSize:'cover'}}>
            <div className='car'>
            <Slider {...settings}>
                <div>
                    <img src={img1}></img>
                </div>
                <div>
                <img src={img2}></img>
                </div>
                <div>
                <img src={img3}></img>
                </div>
                <div>
                <img src={img4}></img>
                </div>
                <div>
                <img src={img5}></img>
                </div>
            </Slider>
            </div>
          </div>
          <div className='loginCard'>
            <Card variant="outlined">
                <div className='instaLogo'><img  src={instagram} ></img></div>
              
                <CardContent>
                    {error!='' && <Alert severity="error">{error}</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <Typography className={classes.text1} variant="subtitle1" color="primary">
                        <Link to="/forgetpassword"> Forget Password ?</Link>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth={true} margin="dense" color='primary' onClick={handleClick}  disabled={loading} >Login</Button>
                </CardActions>
            </Card>
            <Card variant="outlined" className={classes.card2}>
                <Typography className={classes.text1} variant="subtitle1">
                    Don't Have an account  <Link to="/signup">Sign up</Link>
                </Typography>
            </Card>
          </div>
      </div>
    
  );
}
