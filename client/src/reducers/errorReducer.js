const initialState = { error: '' };

export default (state = initialState, action) => {
    switch (action.type) {
        case '400':
        case '403':
        case '404':
        case '409':
        case '422':
        case '500':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
