import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer as Container } from '@react-navigation/native';
import LoginNavigation from './LoginNavigation';

const Navigation = ({ isLoggedIn }) => {
    if (!isLoggedIn) {
        return (
            <Container>
                <LoginNavigation />
            </Container>
        );
    }
};

const mapStateToProps = state => {
    const { isLoggedIn } = state.auth;
    return {
        isLoggedIn,
    };
};

export default connect(mapStateToProps)(Navigation);
