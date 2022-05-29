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
import './Signup.css'
import instagram from '../Assets/Instagram.jfif'
import { createUseStyles } from 'react-jss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';
export default function Signup() {
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
  return (
      <div className='cardWrapper'>
          <div className='signupCard'>
            <Card variant="outlined">
                <div className='instaLogo'><img  src={instagram} ></img></div>
              
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        Sign up to see photos and videos from your friends
                    </Typography>
                    <Alert severity="error">This is an error alert — check it out!</Alert>
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small"/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"/>
                    <TextField id="outlined-basic" label="Full-Name" variant="outlined" fullWidth={true} margin="dense" size="small"/>
                    <Button size="small" variant="outlined" fullWidth={true} margin="dense" color='secondary' startIcon={<CloudUploadIcon/>}  component="label">
                        Upload Profile Image
                        <input type="file" accept="image/*" hidden></input>   
                    </Button>
                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth={true} margin="dense" color='primary'>Sign-Up</Button>
                    
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
