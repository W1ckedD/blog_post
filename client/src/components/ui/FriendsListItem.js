import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FriendListItem = ({ friend }) => {
    return (
        <View>
            <Text>{friend.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default FriendListItem;
