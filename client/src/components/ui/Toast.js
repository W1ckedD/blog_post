import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../global/colors';
import Animated, { Easing } from 'react-native-reanimated';

const Toast = forwardRef((props, ref) => {
    const [opacity] = useState(new Animated.Value(0));
    const closeToast = () => {
        Animated.timing(opacity, {
            duration: 500,
            toValue: 0,
            easing: Easing.inOut(Easing.ease),
        }).start();
    };
    useImperativeHandle(ref, () => ({
        openToast() {
            Animated.timing(opacity, {
                duration: 500,
                toValue: 1,
                easing: Easing.inOut(Easing.ease),
            }).start();
        }
    }))
    return (
        <Animated.View
            style={{
                ...styles.body,
                backgroundColor: colors[props.type],
                opacity,
            }}
        >
            <Text style={styles.msg}>{props.msg}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={closeToast}>
                <Text style={styles.closeBtnText}>X</Text>
            </TouchableOpacity>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    body: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 5,
    },
    msg: {
        color: 'white',
        fontFamily: 'Montserrat',
    },
    closeBtn: {
        position: 'absolute',
        right: 12,
        padding: 4,
    },
    closeBtnText: {
        color: 'white',
        fontFamily: 'Montserrat',
    },
});

export default Toast;
