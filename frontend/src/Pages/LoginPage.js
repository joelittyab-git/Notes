import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import {useState} from 'react'
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Alert from 'react-bootstrap/Alert';
import BaseClient from '../Base/Api/BaseClient';
import { useNavigate } from 'react-router-dom';



export default function LoginPage() {
  //Navigation 
  const navigate = useNavigate();

  //login form
  const [FormData, setFormData] = useState(
    {
      username:"",
      password:"",
      submissionStatus:false
    }
  );

  const [loginStatus, setLoginStatus] = useState(true);

  //login handler
  const loginHandler = async(e) => {


    e.preventDefault();

    setFormData(()=>({...FormData, submissionStatus:true}));
    const postData = {
      "username":FormData.username,
      "password":FormData.password
    }


    //Deletion of token if exists
    const token = localStorage.getItem("Authorization");
    
    let config={};

    if(token!==null){
      const res = await BaseClient.delete('user/auth/',{headers:{Authorization:token}});
      localStorage.removeItem("Authorization");
    }

    console.log("posting")
    //posting request
    const response = await BaseClient.post(
      'user/auth/',
      postData,
    );


    let data = response.data;

    //checking auth status
    if(data.auth_status==="success"){
      //accessing the auth token and saving from the response if succcessfull
      const auth_token = data.auth_data.auth_token;
      setLoginStatus(true);
      localStorage.setItem("Authorization","Token "+auth_token);
      navigate('/notes');
    }else if(data.auth_status==="fail"){
      setLoginStatus(false);
    }else{

    }

    setFormData({submissionStatus:false});
  }

  const handleChange = event  =>{

    if(event.target.type == "email"){
      setFormData({...FormData,username:event.target.value});
    }else if(event.target.type == "password"){
      setFormData({...FormData,password:event.target.value});
    }
  }


  return (
    <CssVarsProvider>
          <div className="alert" hidden={loginStatus==true}>
            <Alert variant='danger'>
              Incorrect username or password
            </Alert>
          </div>

      <main>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="username"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
            />
          </FormControl>

          <Button sx={{ mt: 1 /* margin top */ }} loading={FormData.submissionStatus===true} onClick={loginHandler}>Log in</Button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
