import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../global/colors';


const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const Hero = () => {
    return <View style={styles.hero}></View>;
};

const styles = StyleSheet.create({
    hero: {
        position: 'absolute',
        top: -HEIGHT * 1.1,
        backgroundColor: colors.primary,
        width: '290%',
        height: '150%',
        borderRadius: 1000,
        zIndex: -10,
    },
});

export default Hero;
