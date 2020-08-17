import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../../global/styles';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterScreen = ({ isLoggedIn, navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    return (
        <ImageBackground
            source={require('../../assets/img/bg.png')}
            style={globalStyles.screen}
        >
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
                <Button title='Register' />
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

export default connect(mapStateToProps, {})(RegisterScreen);
