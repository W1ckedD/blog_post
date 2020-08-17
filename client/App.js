import React from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './src/components/navigation/Navigation';
import { useFonts } from 'expo-font';
export default function App() {
    const [loaded] = useFonts({
        Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    });
    if (!loaded) {
      return <ActivityIndicator size="large" />
    }
    return (
        <Provider store={store}>
            <StatusBar style='auto' />
            <Navigation />
        </Provider>
    );
}
