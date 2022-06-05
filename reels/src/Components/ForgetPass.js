import * as React from 'react';
import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import instagram from '../Assets/Instagram.JPG'
import { createUseStyles } from 'react-jss';
import { Link ,useNavigate} from 'react-router-dom';
import './FOrgetPass.css'
import { auth } from '../firebase';

function ForgetPass() {
    const[email,setEmail]= useState('');
    const[error,setError]= useState('');
    let [loading,setLoading] = useState(false);
    let handleClick=async () =>{
        if(email==''){
            setError("Enter a Valid email address");
            setTimeout(()=>{
                setError('');
            },3000);
            return;
        }
        let res= await auth.sendPasswordResetEmail(email);
        console.log(res);
    }
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
          <div className='forgetCard'>
            <Card variant="outlined">
                <div className='instaLogo'><img  src={instagram} ></img></div>
                {error!='' && <Alert severity="error">{error}</Alert>}
                <CardContent>
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth={true} margin="dense" color='primary' disabled={loading} onClick={handleClick} >Send Email</Button>
                </CardActions>
            </Card>
            <Card variant="outlined" className={classes.card2}>
                 <Typography className={classes.text1} variant="subtitle1">
                    <Link to="/login"> Login</Link>
                </Typography>
            </Card>
          </div>
      </div>
  )
}

export default ForgetPass