import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate } from './actions/authActions';
import { clearError } from './actions/errorActions';

// Components
import AppNavbar from './components/navigation/AppNavbar';

// Screens
import LoginNavigation from './components/navigation/LoginNavigation';
import MainNavigation from './components/navigation/MainNavigation';

function App({ authenticate, clearError, isAuthenticated }) {
    useEffect(() => {
        clearError();
        authenticate();
    }, []);
    return (
        <Router>
            <AppNavbar />
            <Container className='d-flex flex-column align-items-center'>
                {isAuthenticated ? <MainNavigation /> : <LoginNavigation />}
            </Container>
        </Router>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, { authenticate, clearError })(App);
