import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../global/styles';
import { connect } from 'react-redux';

const HomeScreen = () => {
    return (
        <View style={globalStyles.screen}>
            <Text>HomeScreen</Text>
        </View>
    );
}

const mapStateToProps = state => {
    return {};
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps)(HomeScreen);