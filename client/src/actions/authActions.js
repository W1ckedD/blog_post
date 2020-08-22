import { AsyncStorage } from 'react-native';
import api from '../api/api';

export const register = ({ email, password }) => async dispatch => {
    try {
        const res = await api.post('/auth/register', {
            email,
            password,
        });
        const { user, token, msg } = await red.data;
        const result = await AsyncStorage.setItem('token', token);
        dispatch({ type: 'LOGIN', payload: { token, msg, user } });
    } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};

export const login = ({ email, password }) => async dispatch => {
    try {
        const res = await api.post('/auth/login', {
            email,
            password,
        });
        const { user, token, msg } = await res.data;
        const storedToken = await AsyncStorage.setItem('token', token);
        const storedUserId = await AsyncStorage.setItem('userId', user._id);
        dispatch({
            type: 'LOGIN',
            payload: { token, msg, user_id: storedUserId },
        });
    } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error });
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
        const user_id = await AsyncStorage.getItem('userId');
        console.log(storedToken);
        if (storedToken) {
            console.log(storedToken);
            dispatch({
                type: 'LOGIN',
                payload: {
                    token: storedToken,
                    user_id,
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
