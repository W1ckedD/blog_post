import React, { useEffect } from 'react';
import { Image, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { getCurrentUser } from '../../actions/userActions';
import { clearError } from '../../actions/errorActions';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({
    name,
    user,
    getCurrentUser,
    clearError,
    logout,
}) => {
    useEffect(() => {
        clearError();
        getCurrentUser();
    }, []);
    return (
        <div className='d-flex'>
            <Image
                roundedCircle
                style={{ width: 40 }}
                src={user ? user.imgUrl : ''}
            />
            <NavDropdown title={name}>
                <NavDropdown.Item>
                    <Link className="nav-dropdown-item" to="/edit-profile">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user.user,
    };
};

export default connect(mapStateToProps, { getCurrentUser, clearError, logout })(
    ProfileDropdown
);
