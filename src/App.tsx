import React from 'react';

import { enableScreens } from 'react-native-screens'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import ViewCard from './screens/ViewCard';
import BottomNav from './components/BottomNav';


enableScreens(); 

export type RootStackParamList = {
    Home: undefined;
    ViewCard: undefined;
    BottomNav: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName = 'Home'>
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;