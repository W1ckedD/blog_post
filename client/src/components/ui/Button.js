import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors } from '../../../global/colors';

const Button = props => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={
                props.secondary ? { ...styles.secondary, ...props.style } : { ...styles.btn, ...props.style }
            }
            onPress={props.onPress}
        >
            <Text
                style={
                    props.secondary
                        ? { ...styles.titleSecondary }
                        : { ...styles.title }
                }
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'white',
        width: '80%',
        padding: 16,
        margin: 16,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Montserrat',
        color: colors.primary,
    },
    secondary: {
        backgroundColor: 'transparent',
        width: '80%',
        padding: 16,
        margin: 16,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleSecondary: {
        color: 'white',
    },
});

export default Button;
