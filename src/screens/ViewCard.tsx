import React, { useState } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNav from '../components/BottomNav';
import { useProfile } from '../components/ProfileContext';

type ViewCardProps = NativeStackScreenProps<RootStackParamList, 'ViewCard'> 

const ViewCard = ({navigation}:ViewCardProps) => {

    const { profile } = useProfile();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Card}>
                <Text>{profile?.common_name}</Text>
                <Text>{profile?.company_name}</Text>
                <Text>{profile?.primary_phone}</Text>
                <Text>{profile?.secondary_phone}</Text>
                <Text>{profile?.email1}</Text>
                <Text>{profile?.email2}</Text>
                <Text>{profile?.address1}</Text>
                <Text>{profile?.city}</Text>
                <Text>{profile?.country}</Text>
                <Text>{profile?.pincode}</Text>
            </View>
            {/* Bottom Navigation */}
            <BottomNav navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3FBFF",
        justifyContent:'center',
        alignContent:'center'
    },

    TopBarNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginVertical: '4%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    WelcomeText: {
        color: "#444242",
        fontSize: 20,
    },

    SearchBar: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: '3%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingHorizontal: 15,
        elevation: 4, // For Android shadow

        // iOS shadow properties
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },

    searchInput: {
        height: 50,
        color: 'black',
        fontSize: 18,
    },

    content: {
        paddingHorizontal: '5%',
        paddingTop: 10,
        paddingBottom: 0, // Adds padding to prevent bottom navbar from covering content

    },

    AdPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 15,
        marginBottom: '5%',
        padding: '10%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },

    CardsHolder: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: '5%',
        paddingTop:5
    },
    
    Card: {
        width:'80%',
        height:'60%',
        alignSelf:'center',
        backgroundColor: 'black',
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },

    CardTextHolder: {
        marginBottom: 10,
    },

    CardText: {
        color: '#444242',
        fontSize: 11,

    },

    CardImage: {
        height: 80,  // Adjust based on your needs
        alignItems: 'center',  // Center the image horizontally
        marginTop: 10,  // Space between text and image
    },
    ImageStyle: {
        width: 140,   // Adjust based on your image size
        height: 80,  // Adjust based on your image size
    },

    BottomNav: {
        position: 'absolute', // Makes the bottom navigation stick to the bottom
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 60,
    },

    NavButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    ButtonText: {
        color: '#444242',
        fontSize: 12,
    },
});

export default ViewCard;