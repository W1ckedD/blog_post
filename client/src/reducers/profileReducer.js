const initialState = { profile: null, msg: '' };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_PROFILE':
            return {
                ...state,
                profile: action.payload.profile,
                msg: action.profile.msg,
            };
        default:
            return state;
    }
};
