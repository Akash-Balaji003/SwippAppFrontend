import React from 'react';

import { enableScreens } from 'react-native-screens'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import ViewCard from './screens/ViewCard';
import BottomNav from './components/BottomNav';
import QRCodeScanner from './screens/QrScannerScreen';
import Login from './screens/Login'
import AccountCreation from './screens/AccountCreation';
import AboutYou from './screens/AboutYou';
import AboutCompany from './screens/AboutCompany';
import Profiles from './screens/Profiles';

enableScreens(); 

export type RootStackParamList = {
    Home: {
        userId: number;
        name: string;
        profileId: number;
        profileTitle: string;
        address1: string;
        address2?: string | null;
        city: string;
        companyName: string;
        country: string;
        email1: string;
        email2?: string | null;
        pincode: string;
        primaryPhone: string;
        secondaryPhone?: string | null;
        username: string;
    };
    Profiles: {
        userId: number;
        name: string;
        profileIds: number[];
        profileTitles: string[];
    };
    ViewCard: undefined;
    BottomNav: undefined;
    QRCodeScanner: undefined;
    Login: undefined;
    AccountCreation: undefined;
    AboutYou: undefined;
    AboutCompany: undefined;
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
                <Stack.Screen
                name='Profiles'
                component={Profiles}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name='AccountCreation'
                component={AccountCreation}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name='AboutYou'
                component={AboutYou}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name='AboutCompany'
                component={AboutCompany}
                options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;