import { AsyncStorage } from 'react-native';
import api from '../api/api';

export const login = ({ email, password }) => async dispatch => {
    try {
        const res = await api.post('/auth/login', {
            email,
            password,
        });
        const { user, token, msg } = await res.data;
        const result = await AsyncStorage.setItem('token', token);
        dispatch({ type: 'LOGIN', payload: { token, msg, user } });
    } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};

export const logout = () => dispatch => {
    try {
        AsyncStorage.removeItem('token').then(res => {
            dispatch({ type: 'LOGOUT', payload: res });
        });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};

export const authenticate = () => dispatch => {
    AsyncStorage.getItem('token').then(res => {
        if (res) {
            dispatch({
                type: 'LOGIN',
                payload: { token: res, msg: 'Login successful' },
            });
        } else {
            dispatch({ type: 'LOGOUT', payload: res });
        }
    });
};
