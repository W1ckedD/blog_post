import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';

const LoginScreen = ({ errorMsg, login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onChange = e => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    };
    return (
        <div>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    login({ email, password });
                }}
            >
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
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Login
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

export default connect(mapStateToProps, { login })(LoginScreen);
