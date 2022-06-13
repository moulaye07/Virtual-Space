import axios from 'axios';
import React, { useState } from 'react';

const Users = ({user}) => {
    const [showForm, setShowForm] = useState(false);
    const [roleUpdate1, setRoleUpdate1] = useState(user ? user.role : "")
	const [userNameUpdate1, setUserNameUpdate1] = useState(user ? user.username : "");

    const deleteUser = async () => {
		try {
			await axios.delete(`${process.env.REACT_APP_API_URL}user/${user._id}`);
            window.location='/admin'
		} catch (err) {
			console.log(err);
		}
	}
    
    const updateUser1 = async () => {
        try {
            const data = {
                "username": userNameUpdate1,
                "role": roleUpdate1
            }
            await axios.put(`${process.env.REACT_APP_API_URL}user/${user._id}`, data);
            
        } catch (err) {
            console.log(err)
        }
        
        setShowForm(false);
    }
    
    return (
        
        <>
            {user ? (
                <li key={user._id} style={{paddingBottom:"10px" ,borderBottom:"solid 1px"}}>
                    <figure>
                        <img src={user.picture} alt=""/>
                    </figure>
                    <div class="people-name">
                        <span>{user.username}</span>
                        <span onClick={()=>setShowForm(!showForm)}><img src='./img/icons/edit.svg' title='edit' alt='edit' style={{height:'25px', marginLeft:'15px'}}/></span>
                        <span onClick={()=>{
                            if(window.confirm(`Supprimer "${user.username}" ?`)) {
                                deleteUser()
                            }
                            }}>
                             <img src='./img/icons/trash.svg' title='delete' alt='delete' style={{height:'25px'}}/>
                        </span>
                    </div>
                                            
                    {showForm===true &&
                        <div className='newpst-input'>
                        <form>
                            <textarea 
                                defaultValue={user.username}
                                onChange={(e) => setUserNameUpdate1(e.target.value)}
                            />
                             <p style={{marginLeft:"15px", marginTop:'15px'}}>
                                <input type="radio" name="role" value="user" defaultChecked onChange={e=>setRoleUpdate1(e.target.value)} className="specialInput"/>user
                                <br/>
                                <input type="radio" name="role" value="admin"  onChange={e=>setRoleUpdate1(e.target.value)} className="specialInput"/>admin
                            </p>
                            <div className='attachments'>
                                <button onClick={updateUser1}>appliquer</button>  
                            </div>
                        </form>
                    </div>
                }
                                            
            </li>

        ) : null}                           
        </>
    );
};

export default Users;