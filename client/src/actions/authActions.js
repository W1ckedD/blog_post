import { AsyncStorage } from 'react-native';
import api from '../api/api';

export const register = ({ email, password }) => async dispatch => {
    try {
        const res = await api.post('/register', {
            email,
            password,
        });
        const { token, msg } = await res.data;
        const result = await AsyncStorage.setItem('token', token);
        dispatch({ type: 'LOGIN', payload: { token, msg } });
    } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};

export const login = ({ email, password }) => async dispatch => {
    try {
        const res = await api.post('/login', {
            email,
            password,
        });
        const { token, msg } = await res.data;
        const storedToken = await AsyncStorage.setItem('token', token);
        dispatch({
            type: 'LOGIN',
            payload: { token, msg },
        });
    } catch (err) {
        dispatch({ type: '500', payload: err.response.data.error });
    }
};

export const logout = () => async dispatch => {
    try {
        const res = await AsyncStorage.removeItem('token');
        dispatch({ type: 'LOGOUT', payload: res });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};

export const authenticate = () => async dispatch => {
    try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
            console.log(storedToken);
            dispatch({
                type: 'LOGIN',
                payload: {
                    token: storedToken,
                    msg: 'Login successful',
                },
            });
        } else {
            dispatch({ type: 'LOGOUT', payload: null });
        }
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};
