import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer as Container } from '@react-navigation/native';
import LoginNavigation from './LoginNavigation';
import MainNavigation from './MainNavigation';
import { authenticate } from '../../actions/authActions';


const Navigation = ({ isLoggedIn, authenticate }) => {
    useEffect(() => {
        authenticate();
    }, []);
    if (!isLoggedIn) {
        return (
            <Container>
                <LoginNavigation />
            </Container>
        );
    }
    return (
        <Container>
            <MainNavigation />
        </Container>
    );
};

const mapStateToProps = state => {
    const { isLoggedIn } = state.auth;
    return {
        isLoggedIn,
    };
};

export default connect(mapStateToProps, { authenticate })(Navigation);
