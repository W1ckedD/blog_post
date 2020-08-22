const initialState = { isLoggedIn: false, token: null, user_id: '', msg: '', error: '' };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                user_id: action.payload.user_id,
                msg: action.payload.msg,
                error: '',
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user_id: '',
                msg: '',
                error: '',
            };
        case 'ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
