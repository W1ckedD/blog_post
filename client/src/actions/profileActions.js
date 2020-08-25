import api from '../api/api';

export const editProfile = ({ name, img, birthday, location, bio }) => async (
    dispatch,
    getState
) => {
    try {
        const token = getState().auth.token;
        console.log(token);
        const data = new FormData();
        data.append('image', img);
        // data.append('name', name);
        // data.append('birthday', birthday);
        // data.append('location', location);
        // data.append('bio', bio);

        const res = await api.post('/edit-user', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: 'Bearer ' + token,
            },
        });
        const { msg, profile } = await res.data;
        dispatch({ type: 'CREATE_PROFILE', payload: { profile, msg } });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};
