import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return (
        <TextInput
            style={{...styles.input, ...props.style}}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            placeholderTextColor={props.placeholderTextColor}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
            value={props.value}
            autoCapitalize={props.autoCapitalize}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '80%',
        padding: 16,
        margin: 16,
        textAlign: 'center',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        borderBottomWidth: 1,
        fontFamily: 'Montserrat',
    },
});

export default Input;
