import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import { register } from '../actions/authActions';
import { validationError } from '../actions/errorActions';

const RegisterScreen = ({ errorMsg, validationError, register }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const onChange = e => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
            default:
                break;
        }
    };
    const isValid = () => {
        if (!email.includes('@')) {
            validationError({ msg: 'Please enter a valid email' });
            return false;
        } else if (password.length < 6) {
            validationError({ msg: 'Password must be atleast 6 characters' });
            return false;
        } else if (password !== password2) {
            validationError({ msg: 'Passwords do not match' });
            return false;
        }
        return true;
    };
    return (
        <div className="w-50">
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    if (!isValid()) {
                        return;
                    }
                    register({ email, password });
                }}
            >
                {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email}
                        name='email'
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        name='password'
                        type='password'
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        value={password2}
                        type='password'
                        name='password2'
                        onChange={onChange}
                    />
                </Form.Group>
                <Button variant='primary' block type='submit' className="w-75 m-auto">
                    Register
                </Button>
            </Form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        errorMsg: state.error.msg,
    };
};

export default connect(mapStateToProps, { validationError, register })(
    RegisterScreen
);
