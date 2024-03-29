import React, { useState } from 'react'
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ApiService from '../../ApiService';


export default function Login() {
    const [login,setLogin] = useState({username: "",password:""});
    const navigate = useNavigate();


    const handleLogin = async(e) => {
      e.preventDefault();
       try{
        const response = await ApiService.login(login.username,login.password);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('role', response.role);
        sessionStorage.setItem('name', response.name);
        sessionStorage.setItem('userId', response.userId);
        toast.success('Login successful');
        if(response.role === 'admin'){
          navigate("/dashboard");
        }else if(response.role === 'employee'){
          navigate("/employee");
        }
       }catch(e){
        toast.error('Authentication failed');
       }
      };

      const handleChange = (e)=>{
        const {value,name} = e.target;
        setLogin(prev=>({
          ...prev,[name]:value
        }))
      }

  return (
    <>
    <Toaster/>
    <Container maxWidth="sm">
    <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          value={login.username}
          onChange={(e)=>handleChange(e)}
          InputProps={{
            startAdornment: (
              <AccountCircle style={{ color: 'gray' }} />
            ),
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name='password'
          value={login.password}
          onChange={(e)=>handleChange(e)}
        />
   
      <Button
        variant="contained"
        color="primary"
        size="large"
        type='submit'
        onClick={(e) => handleLogin (e)}
        style={{marginTop:"10px"}}
        fullWidth
      >
        Login
      </Button>
      </form>
    </Paper>
    <p>Login Credentials..</p> <br />
    <b><span>Admin</span></b> <br />
    <span>User: admin</span> <br />
    <span>Password: admin123</span> <br />
    <b><span>Employee 1</span></b> <br />
    <span>User: ubayy</span> <br />
    <span>Password: ubayy123</span> <br />
    <b><span>Employee 2</span></b> <br />
    <span>User: ahyaan</span> <br />
    <span>Password: ahyaan123</span> <br />
    <b><span>Employee 3</span></b> <br />
    <span>User: abubackr</span> <br />
    <span>Password: abubackr123</span> <br />
    <b><span>Employee 4</span></b> <br />
    <span>User: taufiq</span> <br />
    <span>Password: taufiq123</span> <br />
    <b><span>Employee 5</span></b> <br />
    <span>User: sathesh</span> <br />
    <span>Password: sathesh123</span> <br />
  </Container>
  </>
  )
}
