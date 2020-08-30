import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';

import { getCurrentUser } from '../actions/userActions';
import { clearError } from '../actions/errorActions';

import { connect } from 'react-redux';

const EditProfileScreen = ({ user, getCurrentUser, clearError }) => {
    useEffect(() => {
        clearError();
        getCurrentUser();
    }, []);
    return (
        <div>
            <div>
                <h1>Edit Profile</h1>
                <Image roundedCircle src={user ? user.imgUrl : ''} style={{ width: 400 }} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user.user,
    };
};

export default connect(mapStateToProps, { clearError, getCurrentUser })(
    EditProfileScreen
);
