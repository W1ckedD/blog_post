import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback as TWO,
    TouchableOpacity as TO,
    Dimensions,
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const Item = ({ item, closeOptions }) => {
    const styles = StyleSheet.create({
        item: {
            borderRadius: 8,
            padding: 8,
            margin: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        itemText: {
            fontFamily: 'Montserrat',
        },
    });
    return (
        <TO
            onPress={() => {
                item.onPress();
                closeOptions();
            }}
        >
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.text}</Text>
            </View>
        </TO>
    );
};

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Options = forwardRef(({ items }, ref) => {
    const [height, setHeight] = useState(1);
    const [translateY] = useState(new Animated.Value(600));
    const [display, setDisplay] = useState('none');
    const showOptions = () => {
        setDisplay('flex');
        Animated.timing(translateY, {
            duration: 100,
            toValue: -16,
            easing: Easing.in(Easing.ease),
        }).start();
    };
    const hideOptions = () => {
        setDisplay('none');
        Animated.timing(translateY, {
            duration: 100,
            toValue: height + 16,
            easing: Easing.in(Easing.ease),
        }).start();
    };
    useImperativeHandle(ref, () => ({
        showOptions,
        hideOptions,
    }));
    const styles = StyleSheet.create({
        options: {
            position: 'absolute',
            bottom: 0,
            transform: [{ translateY }],
            width: '80%',
            elevation: 16,
            padding: 16,
            borderRadius: 5,
            backgroundColor: 'white',
            zIndex: 11,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            display,
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            zIndex: 100,
        },
    });

    return (
        <TWO onPress={hideOptions} onBlur={hideOptions}>
            <Animated.View
                ref={ref}
                style={styles.options}
                onLayout={e => setHeight(e.nativeEvent.layout.height)}
            >
                {items.map(item => (
                    <Item key={item.id} item={item} closeOptions={hideOptions} />
                ))}
            </Animated.View>
        </TWO>
    );
});

export default Options;
