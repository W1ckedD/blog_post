const initialState = { profile: null, error: '', msg: '' };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_PROFILE':
            return {
                ...state,
                profile: action.payload.profile,
                msg: action.profile.msg,
            };
        case 'ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
