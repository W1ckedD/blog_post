import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../../global/styles';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';
import { login } from '../actions/authActions';

const LoginScreen = ({ login, error, navigation }) => {
    const errorToastRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <ImageBackground
            source={require('../../assets/img/bg.png')}
            style={globalStyles.screen}
        >
            <Toast ref={errorToastRef} msg={error} type='danger' />
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
                <Button
                    title='Login'
                    onPress={() => {
                        login({ email, password });
                        if (error) {
                            errorToastRef.current.openToast();
                        }
                    }}
                />
            </View>
            <View style={styles.btnContainer}>
                <Text style={globalStyles.lead}>Don't have and account?</Text>
                <Button
                    title='Register'
                    secondary
                    onPress={() => navigation.navigate('register')}
                />
            </View>
        </ImageBackground>
    );
};

const mapStateToProps = state => {
    const { isLoggedIn, token, profile } = state.auth;
    const { error } = state.error;
    return {
        isLoggedIn,
        token,
        profile,
        error,
    };
};
export default connect(mapStateToProps, { login })(LoginScreen);

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
