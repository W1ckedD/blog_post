import api from '../api/api';
import { LOGIN, LOGOUT, ADD_ERROR } from './types';

export const login = ({ email, password }) => async dispatch => {
    try {
        const result = await api.post('/api/login', { email, password });
        console.log(result)
        localStorage.setItem('token', result.data.token);
        dispatch({ type: LOGIN, payload: result.date });
    } catch (err) {
        console.log(err);
        dispatch({ type: ADD_ERROR, payload: err.response.data.error });
    }
};

export const register = ({ email, password }) => async dispatch => {
    try {
        const result = await api.post('/api/register', { email, password });
        localStorage.setItem('token', result.token);
        dispatch({ type: LOGIN, payload: result.token });
    } catch (err) {
        dispatch({ type: ADD_ERROR, payload: err.response.data.error });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT, payload: null });
};

export const authenticate = () => dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch({ type: LOGIN, payload: token });
    } else {
        dispatch({ type: LOGOUT, payload: null });
    }
};
