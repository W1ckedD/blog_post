import api from '../api/api';

export const createProfile = ({
    token,
    user_id,
    name,
    imgBase64,
    birthDay,
    location,
    bio,
}) => async dispatch => {
    try {
        const res = await api.post(
            `/profiles/create-profile/${user_id}`,
            {
                name,
                imgBase64,
                birthDay,
                location,
                bio,
            },
            {
                headers: { authorization: 'Bearer ' + token },
            }
        );
        const { msg, profile } = await res.data;
        dispatch({ type: 'CREATE_PROFILE', payload: { profile, msg } });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
};
