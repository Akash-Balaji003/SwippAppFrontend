import React, { useState } from 'react';
import {
    Image,
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
import BottomNav from '../components/BottomNav';

type QrProps = NativeStackScreenProps<RootStackParamList, 'QRCodeScanner'> 

const QRCodeScanner = ({navigation}:QrProps) => {

    const[text, setText] = useState("Name");

    const Tester = (text: React.SetStateAction<string>) => {
        setText(text);
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Bar */}
            <View style={styles.TopBarNav}>
                <View>
                    <Text style={styles.WelcomeText}>Welcome</Text>
                    <Text style={[styles.WelcomeText, { fontWeight: 'bold', fontSize: 22, color: '#0077B6' }]}>{text}</Text>
                </View>
                <TouchableOpacity>
                    <FontAwesome name="bell-o" size={30} color="black" onPress={() => Tester("Akash")} />
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
                            <Text style={[styles.CardText, {fontSize: 14, fontWeight: 'bold'}]} onPress={() => navigation.navigate("Login")}>
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

                    <TouchableOpacity style={styles.Card} onPress={() => navigation.navigate("ViewCard")}>
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
            <BottomNav navigation={navigation} />
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
        marginVertical: '3%',
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
        marginVertical: '2%',
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
        paddingTop: 5,
        paddingBottom: 0, // Adds padding to prevent bottom navbar from covering content

    },

    AdPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 15,
        marginBottom: '2%',
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
        marginBottom: '2%',
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

});

export default QRCodeScanner;