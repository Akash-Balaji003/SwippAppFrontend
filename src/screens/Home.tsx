import React from 'react';
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

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'> 

const Home = ({navigation}:HomeProps) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Top Bar */}
            <View style={styles.TopBarNav}>
                <View>
                    <Text style={styles.WelcomeText}>Welcome</Text>
                    <Text style={[styles.WelcomeText, { fontWeight: 'bold', fontSize: 22, color: '#0077B6' }]}>Ravi Swaminathan</Text>
                </View>
                <TouchableOpacity>
                    <FontAwesome name="bell-o" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.SearchBar}>
                <TextInput 
                    style={styles.searchInput}
                    placeholderTextColor='black'
                    textAlign='left'
                    placeholder="Search..." 
                />
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.AdPlaceholder}>
                    <Text>Advertisements</Text>
                </View>

                <View style={styles.CardsHolder}>

                    <TouchableOpacity style={styles.Card}>
                        <View style={styles.CardTextHolder}>
                            <Text style={[styles.CardText, {fontSize: 14, fontWeight: 'bold'}]}>
                                <Text style={{color: "#0077B6"}}>EDIT</Text> YOUR CARD
                            </Text>
                            <Text style={[styles.CardText, {paddingTop:3}]}>CHANGE AND CUSTOMISE THE CARD TO YOUR PREFERENCE</Text>
                        </View>
                        <View style={styles.CardImage}>
                            <Image 
                                source={require('/Users/akashbalaji/SwipeApp/frontend/src/images/cardview.png')}  // Add your image source here
                                style={styles.ImageStyle}
                                resizeMode="contain" 
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Card}>
                        <View style={styles.CardTextHolder}>
                            <Text style={[styles.CardText, {fontSize: 14, fontWeight: 'bold'}]}>
                                <Text style={{color: "#0077B6"}}>SHARE</Text> YOUR CARD
                            </Text>
                            <Text style={[styles.CardText, {paddingTop:3}]}>DISTRIBUTE YOUR CARD WITH OTHERS AND EXPAND YOUR NETWORK</Text>
                        </View>
                        <View style={styles.CardImage}>
                            <Image 
                                source={require('/Users/akashbalaji/SwipeApp/frontend/src/images/handshake.jpg')}  // Add your image source here
                                style={styles.ImageStyle}
                                resizeMode="contain" 
                            />
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.CardsHolder}>

                    <TouchableOpacity style={styles.Card}>
                        <View style={styles.CardTextHolder}>
                            <Text style={[styles.CardText, {fontSize: 14, fontWeight: 'bold'}]}>
                                <Text style={{color: "#0077B6"}}>VIEW</Text> YOUR CARD
                            </Text>
                            <Text style={[styles.CardText, {paddingTop:3}]}>CHECK AND REVIEW YOUR CARD DETAILS AT A GLANCE</Text>
                        </View>
                        <View style={styles.CardImage}>
                            <Image 
                                source={require('/Users/akashbalaji/SwipeApp/frontend/src/images/cardview.png')}  // Add your image source here
                                style={styles.ImageStyle}
                                resizeMode="contain" 
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Card}>
                        <View style={styles.CardTextHolder}>
                            <Text style={[styles.CardText, {fontSize: 14, fontWeight: 'bold'}]}>
                                <Text style={{color: "#0077B6"}}>CONNECT</Text> WITH OTHER PEOPLE
                            </Text>
                            <Text style={[styles.CardText, {paddingTop:3}]}>BUILD NEW CONNECTIONS AND EXPLORE OPPORTUNITIES</Text>
                        </View>
                        <View style={styles.CardImage}>
                            <Image 
                                source={require('/Users/akashbalaji/SwipeApp/frontend/src/images/handshake.jpg')}  // Add your image source here
                                style={styles.ImageStyle}
                                resizeMode="contain" 
                            />
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.AdPlaceholder}>
                    <Text>Advertisements</Text>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.BottomNav}>
                <TouchableOpacity style={styles.NavButton}>
                    <Feather name="home" size={28} color="#444242" />
                    <Text style={styles.ButtonText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NavButton}>
                    <Feather name="users" size={28} color="#444242" />
                    <Text style={styles.ButtonText}>Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.NavButton]}>
                    <AntDesign name="qrcode" size={28} color="#0077B6" />
                    <Text style={[styles.ButtonText, { color: "#0077B6" }]}>Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NavButton}>
                    <Ionicons name="chatbox-ellipses-outline" size={28} color="#444242" />
                    <Text style={styles.ButtonText}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NavButton}>
                    <Feather name="user" size={28} color="#444242" />
                    <Text style={styles.ButtonText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3FBFF",
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
        flex: 0.48, // Allows two cards per row with space between them
        backgroundColor: '#FFFFFF',
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

export default Home;