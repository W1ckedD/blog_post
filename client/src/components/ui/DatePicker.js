import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback as TWO,
} from 'react-native';

const DatePicker = ({ getDate, title }) => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    return (
        <TWO onBlur={() => getDate({ year, month, day })}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.datePicker}>
                    <TextInput
                        style={styles.date}
                        placeholderTextColor='black'
                        placeholder='DD'
                        maxLength={2}
                        keyboardType='numeric'
                        onChangeText={text => {
                            setDay(text);
                        }}
                        value={day}
                    />
                    <Text>/</Text>
                    <TextInput
                        style={styles.date}
                        placeholderTextColor='black'
                        placeholder='MM'
                        maxLength={2}
                        keyboardType='numeric'
                        onChangeText={text => {
                            setMonth(text);
                        }}
                        value={month}
                    />
                    <Text>/</Text>
                    <TextInput
                        style={styles.date}
                        placeholderTextColor='black'
                        placeholder='YYYY'
                        maxLength={4}
                        keyboardType='numeric'
                        onChangeText={text => {
                            setYear(text);
                        }}
                        value={year}
                    />
                </View>
            </View>
        </TWO>
    );
};

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontFamily: 'Montserrat',
        margin: 4,
    },
    datePicker: {
        width: '80%',
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    pickerTitle: {
        fontFamily: 'Montserrat',
        alignSelf: 'center',
    },
    date: {
        padding: 4,
        flex: 1,
        borderRadius: 5,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Montserrat',
    },
    pickerItem: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Montserrat',
        color: 'red',
    },
});

export default DatePicker;
