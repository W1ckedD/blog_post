import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const ImageSlider = ({ images }) => {
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={images}
            style={styles.imageList}
            renderItem={({ item }) => (
                <View>
                    <Image style={styles.image} source={{ uri: item }} />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    imageList: {
        padding: 8,
        flex: 1,
    },
    image: {
        width: 100,
        height: 75,
    }
});

export default ImageSlider