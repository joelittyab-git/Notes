import axios from 'axios';
import { useState, useContext } from 'react';
import Cookies from 'universal-cookie'


const Login = () => {


    const handleSubmit = async (e) => {
        e.preventDefault();

        
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
