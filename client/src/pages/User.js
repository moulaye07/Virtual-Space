import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navbar';
import Data from './Data';
import Login from './Login';

const User = () => {
    const uid = useContext(UidContext);
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
							        
                                        <Data />
                                   
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

export default User;