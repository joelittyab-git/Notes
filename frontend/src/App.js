import axios from 'axios';
import { useState, useContext } from 'react';
import Cookies from 'universal-cookie'


const Login = () => {


    const handleSubmit = async (e) => {
        e.preventDefault();

        //posting requests to the server
        const response = await axios.post('http://127.0.0.1:8000/user/auth/',
         {
            
            "username":"joeittab",
            "password":"Kunnuthara123",
         }
        )
        console.log(response);

        //extracting the login status form json response and evaluating it
        let login_status = response.data.auth_status;
        if(login_status==="success"){
            //saves the received token in the local storage
            let token = (response.data.auth_data.auth_token);
            localStorage.setItem('Authorization', 'Token '+token);
        }else if(login_status==="err"){

        }else if(login_status==="fail"){

        }
        // let token = (response.data.auth_data.auth_token);

        // const cookie = new Cookies();
        // cookie.set("Authorization","Token "+token,{});
        // window.location.href = "http://localhost:3000/user/login";
    };

;

    return (
        <>
            <button onClick={handleSubmit}>Login</button>

        </>
    );
};

export default Login;
