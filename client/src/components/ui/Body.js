import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const Body = () => {
    return <View style={styles.body}></View>;
};

const styles = StyleSheet.create({
    body: {
        position: 'absolute',
        bottom: -HEIGHT * 0.8,
        backgroundColor: '#ccc',
        width: '290%',
        height: HEIGHT * 1.3,
        borderRadius: 1000,
        zIndex: -11,
    },
});

export default Body;
