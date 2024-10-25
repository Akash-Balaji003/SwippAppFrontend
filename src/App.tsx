import React from 'react';

import { enableScreens } from 'react-native-screens'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import ViewCard from './screens/ViewCard';
import BottomNav from './components/BottomNav';
import QRCodeScanner from './screens/QrScannerScreen';
import Login from './screens/Login'

enableScreens(); 

export type RootStackParamList = {
    Home: {
        userId: number;
        name: string;
        profileIds: number[];
        profileTitles: string[];
    };
    ViewCard: undefined;
    BottomNav: undefined;
    QRCodeScanner: undefined;
    Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName = 'Login'>
                <Stack.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name='ViewCard'
                component={ViewCard}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name='BottomNav'
                component={BottomNav}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name='QRCodeScanner'
                component={QRCodeScanner}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;