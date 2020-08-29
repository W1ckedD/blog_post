import { LOGIN } from '../actions/types';
const initialState = { isAuthenticated: false, token: null, user: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
            };
        default:
            return state;
    }
};
