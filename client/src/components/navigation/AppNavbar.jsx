import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../ui/ProfileDropdown';
import { connect } from 'react-redux';

const AppNavbar = ({ isAuthenticated }) => {
    return (
        <Navbar bg='primary' variant='dark'>
            <Navbar.Brand>
                <Link to='/' className='navbar-brand'>
                    Infinity
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link href='#home'>Home</Nav.Link>
                    <Nav.Link href='#link'>Link</Nav.Link>
                    <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.1'>
                            Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.2'>
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.3'>
                            Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href='#action/3.4'>
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {isAuthenticated ? (
                    <Nav className='ml-auto'>
                        <ProfileDropdown />
                    </Nav>
                ) : (
                    <Nav className='ml-auto'>
                        <Link to='/login' className='nav-link'>
                            Login
                        </Link>
                        <Link to='/register' className='nav-link'>
                            Register
                        </Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps)(AppNavbar);
