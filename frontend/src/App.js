import axios from 'axios';
import { useState, useContext } from 'react';
import Cookies from 'universal-cookie'


const Login = () => {


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://127.0.0.1:8000/user/login/',
         {
            "username":"joeittab",
            "password":"Kunnuthara123"
         }
        )

        console.log(response)

        const cookie = new Cookies();
        cookie.set("Token-Auth","0d09a7040e397a6d02cac3475e55ea17bd18eb8c",{secure:true});
        window.location.href = "http://localhost:3000/user/login";
    };

;

    return (
        <>
            <button onClick={handleSubmit}>Login</button>

        </>
    );
};

export default Login;
