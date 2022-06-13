import axios from 'axios';
import React, { useState } from 'react';

const Admins = ({user}) => {
	const [showForm1, setShowForm1] = useState(false);
    const [roleUpdate, setRoleUpdate] = useState(user.role);
	const [userNameUpdate, setUserNameUpdate] = useState(user.username);


    const deleteUser = async () => {
		try {
			await axios.delete(`${process.env.REACT_APP_API_URL}user/${user._id}`);
		} catch (err) {
			console.log(err);
		}
	}

    const updateUser = async () => {
        try {
            const data = {
                "username": userNameUpdate,
                "role": roleUpdate
            }
            await axios.put(`${process.env.REACT_APP_API_URL}user/${user._id}`, data);
              
        } catch (err) {
            console.log(err)
        }
        
        setShowForm1(false);
    }


    return (
        <>
            {user ? (
                <li key={user._id} style={{paddingBottom:"10px" ,borderBottom:"solid 1px"}}>
                    <figure>
                        <img src={user.picture} alt=""/>
                    </figure>
                    <div className="people-name">
                        <span>{user.username}</span>
                        <span onClick={()=>setShowForm1(!showForm1)}><img src='./img/icons/edit.svg' title='edit' alt='edit' style={{height:'25px', marginLeft:'15px'}}/></span>
                        <span onClick={()=>{
                            if(window.confirm(`Supprimer "${user.username}" ?`)) {
                                deleteUser()
                            }
                            }}>
                            <img src='./img/icons/trash.svg' title='delete' alt='delete' style={{height:'25px'}}/>
                        </span>
                    </div>
                                            
                    {showForm1===true &&
                        <div className='newpst-input'>
                            <form>
                                <textarea 
                                    defaultValue={user.username}
                                    onChange={(e) => setUserNameUpdate(e.target.value)}
                                />
                                <p style={{marginLeft:"15px", marginTop:'15px'}}>
                                    <input type="radio" name="role" value="user" onChange={e=>setRoleUpdate(e.target.value)} className="specialInput"/>user
                                    <br/>
                                    <input type="radio" name="role" value="admin" defaultChecked onChange={e=>setRoleUpdate(e.target.value)} className="specialInput"/>admin
                                </p>
                                <div className='attachments'>
                                    <button onClick={()=>updateUser()}>appliquer</button>  
                                </div>
                            </form>
                        </div>
                    }
                                            
                </li>

            ) : (null)}
        </>
    );
};

export default Admins;