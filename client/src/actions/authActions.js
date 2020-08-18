import { AsyncStorage } from 'react-native';
import api from '../api/api';

export const login = ({ email, password }) => dispatch => {
    try {
        api.post('/auth/login', {
            email,
            password,
        }).then(result => {
            const { user, token, msg } = result.data;
            AsyncStorage.setItem('token', token).then(res => {
                dispatch({ type: 'LOGIN', payload: { token, msg } });
            })
        });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', payload: 'Something went wrong' });
    }
};

export const authenticate = () => dispatch => {
    AsyncStorage.getItem('token').then(res => {
        dispatch({ type: 'LOGIN', payload: { token: res, msg: 'Login successful' } });
    })
}