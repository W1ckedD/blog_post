import { CLEAR_ERROR, ADD_ERROR } from './types';

export const validationError = ({ msg }) => dispatch => {
    dispatch({ type: ADD_ERROR, payload: msg });
}

export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR, payload: null });
}