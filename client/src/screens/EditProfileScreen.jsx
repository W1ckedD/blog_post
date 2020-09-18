import React, { useState, useEffect } from 'react';
import { Image, Form } from 'react-bootstrap';

import { getCurrentUser } from '../actions/userActions';
import { clearError } from '../actions/errorActions';

import { connect } from 'react-redux';

const EditProfileScreen = ({ user, getCurrentUser, clearError }) => {
    useEffect(() => {
        clearError();
        getCurrentUser();
    }, []);
    const [name, setName] = useState(user ? user.name : '');
    const [location, setLocation] = useState(user ? user.location : '');
    const [birthday, setBirthdat] = useState(user ? user.birthday : '');
    const [bio, setBio] = useState(user ? user.bio : '');

    const onChange = e => {
        switch(e.target.name) {
            default:
                break;
        }
    }
    return (
        <div className="d-flex mt-3">
            <div>
                <Image roundedCircle src={user ? user.imgUrl : ''} style={{ width: 300 }} />
                <h4>{user ? user.email : ''}</h4>
            </div>
            <Form className="card card-body" style={{ width: 400, marginLeft: 8 }}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" value={name} onChange={onChange}/>    
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control name="location" value={location} onChange={onChange}/>    
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" name="birthday" value={birthday} onChange={onChange}/>    
                </Form.Group>
                <Form.Group>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as="textarea" name="bio" value={bio} onChange={onChange}/>    
                </Form.Group> 
            </Form>
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
