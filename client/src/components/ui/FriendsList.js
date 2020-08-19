import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FriendsListItem from './FriendsListItem';

const friends = [
    {
        id: 1,
        name: 'Edward',
    },
    {
        id: 2,
        name: 'Kate'
    },
    {
        id: 3,
        name: 'Fred'
    }
];

const FriendsList = () => {
    return (
        <FlatList
            keyExtractor={item => item.id.toString()}
            data={friends}
            renderItem={({ item }) => <FriendsListItem friend={item} />}
        />
    );
};

const styles = StyleSheet.create({});

export default FriendsList;
