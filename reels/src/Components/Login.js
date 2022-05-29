import * as React from 'react';
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
import instagram from '../Assets/Instagram.jfif'
import { createUseStyles } from 'react-jss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';
import insta from '../Assets/insta.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'
export default function Login() {

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
                    {true &&<Alert severity="error">This is an error alert — check it out!</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small"/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"/>
                    <Typography className={classes.text1} variant="subtitle1" color="primary">
                        Forgot Password?
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth={true} margin="dense" color='primary'>Login</Button>
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
