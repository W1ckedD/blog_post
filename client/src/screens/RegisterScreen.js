import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../../global/styles';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';

import { register } from '../actions/authActions';
const RegisterScreen = ({ error, register, navigation }) => {
    const [err, setErr] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const isValid = () => {
        if(!email.includes('@')) {
            setErr('Please enter a valid email');
            return false;
        }
        if (password.length < 6) {
            setErr('Password must be at least 6 characters');
            return false;
        }
        if (password !== password2) {
            setErr('Passwords do not match');
            return false;
        }
        setErr('');
        return true;
    }
    return (
        <ImageBackground
            source={require('../../assets/img/bg.png')}
            style={globalStyles.screen}
        >
            <Toast msg={err || error} type='danger' />
            <View style={styles.btnContainer}>
                <Input
                    placeholder='Email'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    autoCapitalize='none'
                />
                <Input
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    autoCapitalize='none'
                />

                <Input
                    placeholder='Password'
                    value={password2}
                    onChangeText={text => setPassword2(text)}
                    secureTextEntry
                    autoCapitalize='none'
                />
                <Button title='Register' onPress={() => {
                    if (isValid()) {
                        register({ email, password });
                    }
                }} />
            </View>
            <View style={styles.btnContainer}>
                <Text style={globalStyles.lead}>Already have an account? </Text>
                <Button
                    title='Login'
                    secondary
                    onPress={() => navigation.goBack()}
                />
            </View>
        </ImageBackground>
    );
};

const mapStateToProps = state => {
    const { isLoggedIn, token, user, msg, error } = state.auth;
    return {
        isLoggedIn,
        token,
        user,
        msg,
        error
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
    },
    btnContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
    },
});

export default connect(mapStateToProps, { register })(RegisterScreen);
