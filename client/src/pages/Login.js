import React from 'react';
import Log from '../components/Log';
import logo from './icons8-open-file-folder-96.png';

const Login = () => {
    return (
        <div className="theme-layout">
            <div className="container-fluid pdng0">
                <div className="row merged">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="land-featurearea">
                            <div className="land-meta">
                                <h1>Bienvenue sur My-Stockage !</h1>
                                <div className="friend-logo">
                                    <img src={logo} style={{height: '250px', width: '300px'}} alt=""/>
                                </div>
                                <h3 className="folow-me">Connecte-toi pour accéder à ton espace privée !</h3>
                            </div>	
                        </div>
                    </div>
                    <Log />
                </div>
            </div>
        </div>    
    );
};

export default Login;