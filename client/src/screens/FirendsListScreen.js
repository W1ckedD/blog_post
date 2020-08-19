import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../global/styles';
import FriendsList from '../components/ui/FriendsList';

const FriendsListScreen = () => {
    return (
        <View style={globalStyles.screen}>
            <Text>FriendsListScreen</Text>
            <FriendsList />
        </View>
    );
};

export default FriendsListScreen;
