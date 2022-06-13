import React, { useState } from 'react';
import axios from "axios";

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const usernameError = document.querySelector('.username.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}user/signin`,
            withCredentials: true,
            data: {
                username,
                password
            },
        })
        .then((res) => {
            if (res.data.errors) {
                usernameError.innerHTML = res.data.errors.username;
                passwordError.innerHTML = res.data.errors.password;   
            } else {
                if (res.data.user.role==="admin") {
                    window.location = '/admin';
                }
                if (res.data.user.role==="user") {
                    window.location = '/user';
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })  

    }

    return (
        <div>
            <h2 className="log-title">Connexion</h2>
            <form action='post' onSubmit={handleLogin}>
                <div className="form-group">	
                    <input 
                        type="text" 
                        id="username" 
                        name='pseudo' 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username} 
                        required="required"
                    />
                    <label className="control-label" htmlFor='username'>username</label><i className="mtrl-select"></i>
                </div>
                <div className='username error'></div>
                <div className="form-group">	
                    <input 
                        type="password"
                        id='password'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        required="required"/>
                    <label className="control-label" htmlFor='password'>mot de passe</label><i className="mtrl-select"></i>
                </div>
                <div className='password error'></div>
                <div className="submit-btns">
                    <button className="mtr-btn" type="submit"><span>valider</span></button><br/>
                </div>
            </form> <br/>     
        </div>
							
    );
};

export default SignInForm;