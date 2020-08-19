import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../global/colors';

import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SearchScreen from '../../screens/SearchScreen';
import CreatePostScreen from '../../screens/CreatePostScreen';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: 'white',
                activeTintColor: colors.primary,
                inactiveBackgroundColor: colors.primary,
                inactiveTintColor: 'white',
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => (
                    <Feather
                        name={
                            route.name === 'profile'
                                ? 'user'
                                : route.name === 'create-post'
                                ? 'plus-square'
                                : route.name
                        }
                        size={size}
                        color={focused ? colors.primary : 'white'}
                    />
                ),
            })}
        >
            <Tab.Screen name='home' component={HomeScreen} />
            <Tab.Screen name='search' component={SearchScreen} />
            <Tab.Screen name='create-post' component={CreatePostScreen} />
            <Tab.Screen name='profile' component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainNavigation;
