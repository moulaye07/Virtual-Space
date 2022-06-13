import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Login from './Login';
import Navbar from '../components/Navbar';
import Admins from '../components/Admins';
import Users from '../components/Users';
import Data from './Data';
import { isEmpty } from '../components/Utils';
import { useSelector } from 'react-redux';


const Admin = () => {

    const uid = useContext(UidContext);
    const usersData = useSelector((state) => state.usersReducer);

    return (
        <>
        {uid ? (
            <>
            <Navbar />

            <section>
                
		        <div class="gap gray-bg">
			        <div class="container-fluid">
				        <div class="row">
					        <div class="col-lg-12">
						        <div class="row" id="page-contents">

                                            <div className="col-lg-3">
                                                <aside className="sidebar static">	
                                                    <div className="widget stick-widget">
                                                        <h4 className="widget-title">Admins</h4>
                                                        <ul className="followers scroll">
                                                            {!isEmpty(usersData[0]) && usersData.map((user) => {
                                                                if (user.role==="admin") {
                                                                    return(
                                                                        <Admins user={user}/>
                                                                    )
                                                                }
                                                                return null
                                                            })}					
                                                        </ul>
                                                    </div>									
                                                </aside>
                                            </div>

                                            <Data />

                                           <div className="col-lg-3">
                                                <aside className="sidebar static">	
                                                    <div className="widget stick-widget">
                                                        <h4 className="widget-title">Users</h4>
                                                        <ul className="followers scroll">
                                                            {!isEmpty(usersData[0]) && usersData.map((user) => {
                                                                if (user.role==="user") {
                                                                    return(
                                                                        <Users user={user}/>
                                                                    )
                                                                }
                                                                return null
                                                            })}					
                                                        </ul>
                                                    </div>									
                                                </aside>
                                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            </>

        ) : (
            <Login />
        )}
            
        </>      
    );
};

export default Admin;