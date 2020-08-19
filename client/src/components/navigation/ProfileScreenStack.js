import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../../screens/ProfileScreen';
import FriendListScreen from '../../screens/FirendsListScreen'; 
import FriendsListScreen from '../../screens/FirendsListScreen';

const Stack = createStackNavigator();

const ProfileScreenStack =  () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile" component={ProfileScreen} />
            <Stack.Screen name="friendList" component={FriendsListScreen} />
        </Stack.Navigator>
    )
}

export default ProfileScreenStack;