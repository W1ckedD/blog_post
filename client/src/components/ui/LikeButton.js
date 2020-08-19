import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback as TWF,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, { Easing } from 'react-native-reanimated';

const LikeButton = ({ isLiked, likeCount, onPress }) => {
    const [scale] = useState(new Animated.Value(1));
    const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
    const animate = () => {
        Animated.timing(scale, {
            duration: 100,
            toValue: 1.5,
            easing: Easing.ease,
        }).start(() => {
            Animated.timing(scale, {
                duration: 100,
                toValue: 1,
                easing: Easing.ease,
            }).start();
        });
    };
    const styles = StyleSheet.create({
        icon: {
            padding: 8,
            transform: [{ scale }],
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        likeCount: {
            alignSelf: 'center',
            fontFamily: 'Montserrat'
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.likeCount}>{likeCount}</Text>
            <TWF
                onPress={() => {
                    animate();
                    onPress();
                }}
            >
                <AnimatedIcon
                    name={isLiked ? 'heart' : 'hearto'}
                    size={20}
                    color={isLiked? 'red' : 'black'}
                    style={styles.icon}
                />
            </TWF>
        </View>
    );
};

export default LikeButton;
