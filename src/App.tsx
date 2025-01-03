import React, { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileProvider, useProfile } from './contexts/ProfileContext';

import Home from './screens/Home';
import EditCard from './screens/EditCard';
import ViewCard from './screens/ViewCard';
import BottomNav from './components/BottomNav';
import QRCodeScanner from './screens/QrScannerScreen';
import Login from './screens/Login';
import AccountCreation from './screens/AccountCreation';
import AboutYou from './screens/AboutYou';
import AboutCompany from './screens/AboutCompany';
import Profiles from './screens/Profiles';
import QRCodeResult from './screens/QRCodeResult';
import ScanCard from './screens/ScanCard';
import ScannedCardScreen from './screens/ScannedCardScreen';
import UserProfile from './screens/UserProfile';
import FriendProfile from './screens/FriendProfile';
import SavedCards from './screens/SavedCards';
import CardView from './screens/CardView';
import NewProfile from './screens/NewProfile';

import { getProfileData } from './tasks/Storage';
import { ActivityIndicator, View } from 'react-native';
import { UserProvider } from './contexts/UserContext';


enableScreens(); 

export type RootStackParamList = {
    Home: undefined;
    Profiles: {
        userId: number;
        name: string;
        profileIds: number[];
        profileTitles: string[];
    };
    EditCard: undefined;
    ViewCard: undefined;
    BottomNav: undefined;
    QRCodeScanner: undefined;
    Login: undefined;
    AccountCreation: undefined;
    AboutYou: {
        common_name: string;
        phone_number: string;
        password: string;
    };
    AboutCompany: {
        common_name: string;
        phone_number: string;
        password: string;

        profile_title: string;
        primary_phone: string;
        email1: string;
    };
    QRCodeResult: {
        QRResult: string | undefined;
    };
    ScanCard: undefined;
    ScannedCardScreen: {
        Name: string | null;
        designation: string | null;
        phone_number: string | null;
        email_id: string | null;
    };
    UserProfile: undefined;
    SearchBar: undefined;
    FriendProfile: {
        friend_id: number,
        remarks: string
    };
    SavedCards: undefined;
    CardView: {
        card_id: number
    };
    NewProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppWrapper = () => {
    const { setProfile } = useProfile();

    useEffect(() => {

        const fetchUserData = async () => {
            const userData = await getProfileData(); // Fetch all user data (not just user_id)
            
            if (userData) {
                console.log('User Data found:', userData);
                setProfile(userData);
            }
        };
        fetchUserData();

    }, []);
    return null;
};

function App(): React.JSX.Element {
    
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);  // Will hold login state

    useEffect(() => {
        const checkUserStatus = async () => {
            const userData = await getProfileData();  // Fetch user data
            setIsLoggedIn(!!userData);  // If user data exists, set logged in to true
        };
        
        checkUserStatus();  // Check on app start
    }, []);

    if (isLoggedIn === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }
    return (
        <UserProvider>
            <ProfileProvider>
                <NavigationContainer>
                    <AppWrapper />
                    <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
                        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                        <Stack.Screen name='ViewCard' component={ViewCard} options={{ headerShown: false }} />
                        <Stack.Screen name='EditCard' component={EditCard} options={{ headerShown: false }} />
                        <Stack.Screen name='BottomNav' component={BottomNav} options={{ headerShown: false }} />
                        <Stack.Screen name='QRCodeScanner' component={QRCodeScanner} options={{ headerShown: false }} />
                        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name='Profiles' component={Profiles} options={{ headerShown: false }} />
                        <Stack.Screen name='AccountCreation' component={AccountCreation} options={{ headerShown: false }} />
                        <Stack.Screen name='AboutYou' component={AboutYou} options={{ headerShown: false }} />
                        <Stack.Screen name='AboutCompany' component={AboutCompany} options={{ headerShown: false }} />
                        <Stack.Screen name='QRCodeResult' component={QRCodeResult} options={{ headerShown: false }} />
                        <Stack.Screen name='ScanCard' component={ScanCard} options={{ headerShown: false }} />
                        <Stack.Screen name='ScannedCardScreen' component={ScannedCardScreen} options={{ headerShown: false }} />
                        <Stack.Screen name='UserProfile' component={UserProfile} options={{ headerShown: false }} />
                        <Stack.Screen name='FriendProfile' component={FriendProfile} options={{ headerShown: false }} />
                        <Stack.Screen name='SavedCards' component={SavedCards} options={{ headerShown: false }} />
                        <Stack.Screen name='CardView' component={CardView} options={{ headerShown: false }} />
                        <Stack.Screen name='NewProfile' component={NewProfile} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ProfileProvider>
        </UserProvider>
    );
}

export default App;
