import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainScreen from '../../screens/MainScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';

const MainNavigation = () => {
    return (
        <Switch>
            <Route exact path="/edit-profile">
                <EditProfileScreen />
            </Route>
            <Route exact path="/">
                <MainScreen />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default MainNavigation
