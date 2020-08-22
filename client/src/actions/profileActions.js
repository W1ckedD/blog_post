import api from '../api/api';

export const getMyProfile = ({ token }) => async dispatch => {
    try {
        const res = await api.get('/profiles/my-profile', {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });
        const { profile } = await res.data;
        dispatch({ type: 'GET_PROFILE', payload: profile });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};

export const createProfile = ({
    user_id,
    name,
    img,
    birthDay,
    location,
    bio,
    token,
}) => async dispatch => {
    try {
        const data = new FormData();
        data.append('image', img);

        const res = await api.post(
            `/profiles/create-profile/${user_id}`,
            {
                name,
                image: data,
                birthDay,
                location,
                bio,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        const { msg, profile } = await res.data;
        dispatch({ type: 'CREATE_PROFILE', payload: { profile, msg } });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};
