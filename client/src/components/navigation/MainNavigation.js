import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default MainNavigation;