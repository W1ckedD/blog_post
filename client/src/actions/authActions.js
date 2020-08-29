import api from '../api/api';
import { LOGIN, ADD_ERROR } from './types';

export const login = ({ email, password }) => async dispatch => {
    try {
        const result = await api.post('/api/login', { email, password });
        localStorage.setItem('token', result.token);
        dispatch({ type: LOGIN, payload: result });
    } catch (err) {
        console.log(err);
        dispatch({ type: ADD_ERROR, payload: err.response.data.error });
    }
};
