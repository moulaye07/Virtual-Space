import axios from "axios";
import React, { useContext, useState } from "react";
import { ContextParent } from "../../Store";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [controlPassword, setControlPassword] = useState("");
  const [state, setState] = useContext(ContextParent);

  const handleRegister = async () => {
    
    const usernameError = document.querySelector(".username.error");
    const passwordError = document.querySelector(".password.error");
    const passwordControlError = document.querySelector(
      ".password-controller.error"
    );

    passwordControlError.innerHTML = "";

    if (password !== controlPassword) {
        passwordControlError.innerHTML = "Les mots de passe ne sont pas conforment";   
    } else {
      
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}user/signup`,
        withCredentials: true,
        data: {
          "username": username,
          "password": password,
          "role": role
        },
      })
        .then((res) => {
          if (res.data.errors) {
            usernameError.innerHTML = res.data.errors.name;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            console.log(res)
            setState(!state)
        }
        })
        .catch((err) => {
          console.log(err);
        });
      }
  };

  return (
    <div className="widget stick-widget" style={{background:'white', marginBottom:'30px', border:'2px solid', padding:"10px"}}>
      <h4 className="widget-title">Create user</h4>
      <form action="">
        <div className="form-group" style={{paddingLeft:'30px', paddingRight:"30px"}}>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required="required"
          />
          <label className="control-label" htmlFor="name">
            username
          </label>
          <i className="mtrl-select"></i>
          <span className="username error"></span>
        </div>

        <div className="form-group" style={{paddingLeft:'30px', paddingRight:"30px"}}>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required="required"
          />
          <label className="control-label" htmlFor="password">
            password
          </label>
          <i className="mtrl-select"></i>
          <span className="password error"></span>
        </div>

        <div className="form-group" style={{paddingLeft:'30px', paddingRight:"30px"}}>
          <input
            type="password"
            id="controlPassword"
            name="controlPassword"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
            required="required"
          />
          <label className="control-label" htmlFor="controlPassword">
            confirm password
          </label>
          <i className="mtrl-select"></i>
          <span className="password-controller error"></span>
        </div>
        
        <p style={{marginLeft:"15px", marginTop:'15px'}}>
          <input type="radio" name="role" value="user" defaultChecked onChange={e=>setRole(e.target.value)} className="specialInput"/>user
          <br/>
          <input type="radio" name="role" value="admin" onChange={e=>setRole(e.target.value)} className="specialInput"/>admin
        </p>
       
        

        <div className="attachments">
          <button onClick={handleRegister}>
            <span>valider</span>
          </button>
          <button onClick={()=>setState(!state)} style={{marginLeft:"30px"}}>
            <span>annuler</span>
          </button>
        </div>
      </form>
      <br />
    </div>
  );
};

export default SignUpForm;
