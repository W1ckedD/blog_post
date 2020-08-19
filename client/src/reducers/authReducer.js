const initialState = { isLoggedIn: false, token: null, user: null, msg: '', error: '' };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload.user,
                msg: action.payload.msg,
                error: '',
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: null,
                msg: '',
                error: '',
            };
        case 'ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
