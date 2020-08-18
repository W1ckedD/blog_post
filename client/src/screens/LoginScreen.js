import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../../global/styles';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';
import { login } from '../actions/authActions';

const LoginScreen = ({ login, navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <ImageBackground
            source={require('../../assets/img/bg.png')}
            style={globalStyles.screen}
        >
            <Toast msg='' type='danger' />
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
    return {
        isLoggedIn,
        token,
        profile,
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

export default connect(mapStateToProps, { login })(LoginScreen);
