import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors } from '../../../global/colors';

const Link = props => {
    return (
        <TouchableOpacity
            style={{ ...styles.link, ...props.style }}
            activeOpacity={0.8}
            onPress={props.onPress}
        >
            <Text style={{ ...styles.linkText, ...props.textStyle }}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: {
        padding: 4,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    linkText: {
        fontFamily: 'Montserrat',
        fontSize: 16
    },
});

export default Link;
