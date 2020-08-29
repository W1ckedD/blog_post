import React from 'react';
import { Image, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';

const ProfileDropdown = ({ name }) => {
    return (
        <div className="d-flex">
            <Image
                roundedCircle
                style={{ width: 40 }}
                src='https://cdn4.vectorstock.com/i/1000x1000/21/98/male-profile-picture-vector-1862198.jpg'
            />
            <NavDropdown title={name}>
                <NavDropdown.Item>
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    );
};

export default ProfileDropdown;
