import { ADD_ERROR, CLEAR_ERROR } from '../actions/types';
const initialState = { msg: '' };

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return { ...state, msg: action.payload };
        case CLEAR_ERROR:
            return { ...state, msg: '' };
        default:
            return state;
    }
}