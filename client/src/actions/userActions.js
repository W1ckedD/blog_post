import { GET_CURRENT_USER, ADD_ERROR } from './types';
import api from '../api/api';

export const getCurrentUser = () => async dispatch => {
    try {
        const result = await api.get('/api/current-user');
        dispatch({ type: GET_CURRENT_USER, payload: result.data.user });
    } catch (err) {
        console.log(err);
        dispatch({ type: ADD_ERROR, payload: err.response.data.error });
    }
};
