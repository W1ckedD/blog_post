import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';

const LoginNavigation = () => {
    return (
        <Switch>
            <Route exact path='/login'>
                <LoginScreen />
            </Route>
            <Route exact path='/register'>
                <RegisterScreen />
            </Route>
        </Switch>
    );
};

export default LoginNavigation;
