import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {roleget,save} from '../service/RoleService';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.eminds.ai/">
      Em Product Store Sample project by BhanuBandi
      </Link>{' '}
      
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Roles = () => {

    const [roles, setRoles] = useState([])
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

   
   const getRoles = () => 
   {
       roleget("/view")
           .then(res => {
               console.log(res.data)
               setRoles(res.data)
           })
           .catch(err => console.log(err))
   }


   useEffect(() => {

       getRoles() // called the method each time when the page is loaded

   }, [])

   const handleSubmit= (e) =>
   { 
           save("/login",
           {
               emailId:emailId,
               password:password
           })
           .then(res => {
               validateSuccess(res.data);
                 })   
                 e.preventDefault()
   }

   function validateSuccess(status)
   {
          
           if( status === "LoginSuccess")
           {
               
               roles.map(p => {
               if((p.emailId) === emailId)
               {
                   let userid = p.rolesId
                   let usertype = p.userType
                 // alert(userid + "\t" +p.userName + "\t" + p.password + "\t" + p.emailId +"\t" + p.mobile +"\t" + usertype);
                   localStorage.setItem("userId",userid);
                   if(usertype === "Admin")
                   {
                       navigate('/home');
                   }
                   else if(usertype === "User")
                   {
                       navigate('/besales');
                   }
                   else
                   {    
                       navigate('/') ;
                   }
               }
           })
           
       }
   
   }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(cart.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography  >
              <div class="container">
               <div class="row">
                <div class="col-md-12 text-center">
                  <h5 class="animate-charcter"> Em Product Store</h5>
                </div>
              </div>
            </div>
              
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="EmailId"
                label="Email Id"
                name="Email Id"
                autoComplete="Email Id"
                autoFocus
                value={emailId}
                onChange={(e)=>setEmailId(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
               
                <Grid item>
                  <Link href="SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Roles