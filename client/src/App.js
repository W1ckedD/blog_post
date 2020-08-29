import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import AppNavbar from './components/navigation/AppNavbar';

// Screens
import LoginNavigation from './components/navigation/LoginNavigation';
import MainScreen from './screens/MainScreen';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <AppNavbar />
                <Container className='App'>
                    <LoginNavigation />
                </Container>
            </Router>
        </Provider>
    );
}

export default App;
