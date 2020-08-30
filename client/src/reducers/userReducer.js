import { GET_CURRENT_USER } from '../actions/types';
const initialState = { user: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}