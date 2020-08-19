const initialState = { isLoggedIn: false, token: null, msg: '', error: '' };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                msg: action.payload.msg,
                error: '',
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: '',
                error: '',
            };
        case 'ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
