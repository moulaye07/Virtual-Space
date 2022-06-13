import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Admin from '../../pages/Admin';
import User from '../../pages/User';
import Login from '../../pages/Login';

const index = () => {
    return (
        
        <Router>
            <Switch>
                <Route path='/admin' exact component={Admin} />
                <Route path='/user' exact component={User} />
                <Route path='/login' exact component={Login} />
                <Redirect to='/login' />
            </Switch>
        </Router>
        
    );
};

export default index;