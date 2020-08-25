import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../global/styles';
import { connect } from 'react-redux';
import Toast from '../components/ui/Toast';

const HomeScreen = ({ msg }) => {
    return (
        <View style={globalStyles.screen}>
            <Toast msg="User Registered" type="success"/>
            <Text>HomeScreen</Text>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        msg: state.auth.msg
    };
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps)(HomeScreen);