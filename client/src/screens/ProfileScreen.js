import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../../global/styles';

import Button from '../components/ui/Button';
import Link from '../components/ui/Link';
import Hero from '../components/ui/Hero';
import Body from '../components/ui/Body';


import { logout } from '../actions/authActions';
import PostsListItem from '../components/ui/PostsListItem';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const ProfileScreen = ({ logout, navigation }) => {
    return (
        <View style={{...globalStyles.screen, justifyContent: 'flex-end'}}>
            <Hero />
            <Button
                style={styles.btnLogout}
                secondary
                onPress={logout}
                title='Logout'
            />
            <Button
                style={styles.btnEdit}
                secondary
                onPress={() => console.log('Pressed')}
                title='Edit Profile'
            />
            <Image
                style={styles.imgContainer}
                source={{
                    uri:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFfao9ML9S9TYzrCqtva7w0FW1Y2RL2CriuQ&usqp=CAU',
                }}
            />
            <View style={styles.infoContainer}>
                <View style={styles.numberContainer}>
                    <Link
                        text={15}
                        textStyle={styles.number}
                        onPress={() => navigation.navigate('friendList')}
                    />
                    <Text>Friends</Text>
                </View>
                <Text style={styles.name}>W1ckedD</Text>
                <View>
                    <Link text={102} textStyle={styles.number} />
                    <Text>Posts</Text>
                </View>
            </View>
            <Body />
            <View style={styles.postContainer}>
                <PostsListItem />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imgContainer: {
        position: 'absolute',
        top: HEIGHT * 0.15,
        width: 120,
        height: 120,
        borderRadius: 100,
    },
    infoContainer: {
        position: 'absolute',
        top: HEIGHT * 0.27,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    numberContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        fontFamily: 'MontserratBold',
        fontSize: 22,
    },
    name: {
        marginVertical: 22,
        fontFamily: 'MontserratBold',
        fontSize: 16,
    },

    btnLogout: {
        position: 'absolute',
        top: 48,
        right: WIDTH * 0.45,
    },
    btnEdit: {
        position: 'absolute',
        top: 48,
        left: WIDTH * 0.4,
    },
    postContainer: {
        width: '100%',
        paddingVertical: 16,
        marginVertical: 16,
        alignItems: 'center',
    }
});

export default connect(null, { logout })(ProfileScreen);
