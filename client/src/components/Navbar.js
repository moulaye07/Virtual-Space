import React, { useContext, useEffect, useState }/*, { useContext }*/ from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import logo from "../pages/icons8-open-file-folder-96.png";
import { ContextParent } from '../Store';
import { ContextSearch } from '../StoreForSearch';
import Logout from './Log/Logout';


const Navbar = () => {
    const userData = useSelector((state) => state.userReducer);
    const files = useSelector((state) => state.fileReducer);
    const directories = useSelector((state) => state.directoryReducer);
    const [state, setState] = useContext(ContextParent);
    const [queryState, setQueryState] = useContext(ContextSearch);
	const [searchQuery, setsearchQuery] = useState("");
    
    const searchFunction = (e) => {
        e.preventDefault()
        setQueryState(searchQuery);
    }

    useEffect(() => {
		if(queryState===null){
			setsearchQuery('')
		}
	}, [queryState]);


    return (
        <div className="topbar stick">
            <div className="logo">
                <NavLink exact to='/'>
                    <img src={logo} style={{width: '50px', height: '50px'}} alt="logo"/> My-Stockage
                </NavLink>
            </div>
            <div className="top-area">
                <ul>
                    <li>
                        <form className="d-flex" style={{marginTop:'10px'}}>
                            <input className="form-control me-1" 
                                type="search" 
                                id='search' 
                                placeholder="Que chercher-vous?" 
                                name="search"
                                onChange={(e) => setsearchQuery(e.target.value)}
                                value={searchQuery} 
                            />
                            <button className="btn btn-light" onClick={searchFunction}>Chercher</button>
                        </form>
                    </li>
                    {userData.role==="admin" &&
                        <li onClick={()=>setState(true)}>
                        <img src='./img/icons/icons8-add-administrator-48.png' title='new user' alt='new user' style={{height:'40px', marginTop:'10px'}}/>
                        </li>
                    }
                    <li>
                        <img src='./img/icons/icons8-checked-user-male-30.png' title='new user' alt='new user' style={{float:'left'}}/><br/>
                        {userData.username}
                    </li>
                    
                    <Logout />
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
