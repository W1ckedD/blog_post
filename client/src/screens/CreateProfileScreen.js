import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    StyleSheet,
    TouchableWithoutFeedback as TWO,
    Image,
    View,
} from 'react-native';
import { globalStyles } from '../../global/styles';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Options from '../components/ui/Options';
import Input from '../components/ui/Input';
import DatePicker from 'react-native-datepicker';
import Constants from 'expo-constants';
import Button from '../components/ui/Button';
import Body from '../components/ui/Body';
import Hero from '../components/ui/Hero';
import Toast from '../components/ui/Toast';
import { createProfile } from '../actions/profileActions';

const CreateProfileScreen = ({ error, token, user, createProfile }) => {
    const optionsRef = useRef();
    const [imgUrl, setImgUrl] = useState(
        'https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg'
    );
    const [name, setName] = useState('');
    const [birthDay, setBirthday] = useState(new Date('2002'));
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            );
            if (status !== 'granted') {
                alert(
                    'Sorry, we need camera roll permissions to make this work!'
                );
            }
        }
    };
    useEffect(() => {
        getPermissionAsync();
    }, []);
    const pickImageFromGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });
            if (!result.cancelled) {
                setImgUrl('data:image/png;base64,' + result.base64);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const captureImageFromCamera = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
                base64: true,
            });
            if (!result.cancelled) {
                setImgUrl('data:image/png;base64,' + result.base64);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const items = [
        {
            id: 1,
            text: 'Select From Gallery',
            onPress() {
                pickImageFromGallery();
            },
        },
        {
            id: 2,
            text: 'Open Camera',
            onPress() {
                captureImageFromCamera();
            },
        },
    ];
    return (
        <TWO onPress={() => optionsRef.current.hideOptions()}>
            <View style={globalStyles.screen}>
                <Hero />
                <TWO onPress={() => optionsRef.current.showOptions()}>
                    <Image
                        source={{
                            uri: imgUrl,
                        }}
                        style={styles.image}
                    />
                </TWO>
                <Toast msg={error} type="danger" />
                <Input
                    placeholder='Name'
                    placeholderTextColor='black'
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <Text style={styles.text}>Birthday</Text>

                <DatePicker
                    mode='date'
                    style={{ width: '80%' }}
                    display='default'
                    date={birthDay}
                    placeholder='Select Date'
                    onDateChange={date => {
                        setBirthday(date);
                    }}
                />
                <Input
                    placeholder='Location'
                    placeholderTextColor='black'
                    style={styles.input}
                    onChangeText={text => setLocation(text)}
                    value={location}
                />
                <Input
                    placeholder='Bio'
                    placeholderTextColor='black'
                    style={styles.input}
                    onChangeText={text => setBio(text)}
                    value={bio}
                />
                <Options ref={optionsRef} items={items} />
                <Button
                    title='Create Profile'
                    onPress={() => {
                        createProfile({
                            token,
                            user_id: user._id,
                            name,
                            imgBase64: imgUrl,
                            birthDay,
                            location,
                            bio,
                        });
                    }}
                />
                <Body />
            </View>
        </TWO>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    input: {
        color: 'black',
        borderColor: 'black',
    },
    text: {
        fontFamily: 'Montserrat',
        color: '#ccc',
        marginBottom: 16,
    },
});

const mapStateToProps = state => {
    return {
        error: state.profile.error,
        user: state.auth.user,
        token: state.auth.token,
    };
};

export default connect(mapStateToProps, { createProfile })(CreateProfileScreen);
