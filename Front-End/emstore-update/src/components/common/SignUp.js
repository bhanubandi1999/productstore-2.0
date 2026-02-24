import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { Alert } from 'react-bootstrap'





const RegisterForm =()=> {
    const[formValue, setFormValue] =useState({
     userName:'',
     emailId:'',
     mobile:'',
     password:'',
     confirmPassword:'',
     userType:''       
    });

  
    const [formError, setFormError] = useState({});
    const [status, setStatus] = useState('');
    const [isSubmit, setSubmit] = useState(false);

const handleValidation = (e) =>
{
 setFormValue({...formValue, [e.target.name]: e.target.value});   
}

const handleSubmit = (e) =>
{  e.preventDefault();
 setFormError(validateForm(formValue));
 setSubmit(true);   
}

const validateForm = (value) =>
{
 const errors= {};

 if(!value.userName) 
 {
    errors.userName = "Please Enter Valid Name";
 }
 else if( !(value.userName.match(/^[a-zA-Z ]*$/)) )
 {
    errors.userName = "User Name must containt alphabet characters only";
 }

 if(!value.mobile) 
 {
    errors.mobile = "Please Enter Valid Mobile Number";
 }
 else if( !(value.mobile.match(/^[0-9]{10}$/)) )
 {
    errors.mobile = "Mobile Number must contain 10 digits";
 }

 if(!value.password) 
 {
    errors.password = "Please Enter Valid Password";
 }
 else if(!value.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/))
 {
    errors.password = "Password must contain 8 characters length with capital letter and special symbol";
 }

 if(!value.confirmPassword) 
 {
    errors.confirmPassword = "Please Enter Confirm Password";
 }
 else if( (value.confirmPassword !== value.password) )
 {
    errors.confirmPassword = "Password and Confirm Password must be same";
 }
 if(!value.emailId) 
 {
    errors.emailId = "Please Enter Valid Emailid";
 }
 else if(!(value.emailId.match(/^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/)))
 {
    errors.emailId = "Email Id must contain @ and . special characters";
 }
 if(!value.userType) 
 {
    errors.userType = "Please Select User Type";
 }
 

 return errors;
}

useEffect(() =>
{
 if ( Object.keys(formError).length === 0 && isSubmit )
 {     
    axios.post("http://localhost:8080/api/v5/save",
          {
     userName: formValue.userName,
     emailId: formValue.emailId,
     mobile: formValue.mobile,
     password: formValue.password,
     userType: formValue.userType
             }).then(res =>{
   setStatus(res.data)
                   } );
                }
},[formError])

const roles = [
  {
   label:'User',
   value:'User'
  },
  {
    value: 'Admin',
    label: 'Admin',
  },
 
 
];


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

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <div>  {status.length > 0 && (<Alert variant='success'>{status}</Alert>)} 
            <Grid container spacing={2}>
            
              <Grid item xs={12} >
                <TextField 
                  error={formError.userName}
                  autoComplete="given-name"
                  name="userName"
                  type="text"
                  required
                  fullWidth
                  id="username"
                  label="*username"
                  autoFocus
                  value={formValue.userName}
                  onChange={handleValidation}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                   error={formError.mobile}
                  required
                  fullWidth
                  id="Mobile Number"
                  label="*Mobile Number"
                  name="mobile"
                  autoComplete="Mobile Number"
                  value={formValue.mobile}
                  onChange={handleValidation}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={formError.emailId}
                  id="email"
                  label="*Email Address"
                  name="emailId"
                  autoComplete="email"
                  value={formValue.emailId}
                  onChange={handleValidation}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                   error={formError.password}
                  required
                  fullWidth
                  name="password"
                  label="*Enter Password"
                  type="password"
                  id="pas"
                  value={formValue.password}
                  onChange={handleValidation}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={formError.confirmPassword}
                  fullWidth
                  name="confirmPassword"
                  label="*cofirm Password"
                  type="password"
                  id="coPassword"
                  value={formValue.confirmPassword}
                  onChange={handleValidation}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                              id="outlined-select-currency"
                              select
                              name='userType'
                              label="*Select*"
                              defaultValue=""
                              error={formError.userType}
                              helperText="please select a option "
                              value={formValue.userType} 
                              onChange={handleValidation}
                            >
                              {roles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
               </Grid>             
            </Grid>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: -1 }} />
      </Container>
    
  );
}

export default RegisterForm;
