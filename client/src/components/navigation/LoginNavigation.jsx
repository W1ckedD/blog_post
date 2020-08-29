import React from 'react'
import { Switch, Route } from 'react-router-dom';
import LoginScreen from '../../screens/LoginScreen';


const LoginNavigation = () => {
    return (
        <Switch>
            <Route path="/login">
                <LoginScreen />
            </Route>
        </Switch>
    )
}

export default LoginNavigation
