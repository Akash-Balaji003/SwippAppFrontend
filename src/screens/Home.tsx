import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomNav from '../components/BottomNav';
import { useProfile } from '../components/ProfileContext';

interface Friend {
    friend_profile_id: string;
    common_name: string;
    profile_title: string;
}

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'> 

const Home = ({navigation}:HomeProps) => {

    const { profile } = useProfile();
    const { height } = useWindowDimensions();

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<Friend[]>([]); // State for storing search results

    const getFriends = async (query: number | string) => {
        try {
            const response = await fetch(`https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/get-friend?data=${profile?.profile_id}`);
            if (!response.ok) throw new Error('Failed to fetch profile data');
            const friendData = await response.json();
            console.log('data', friendData);
            setSearchResults(friendData);
        } catch (error) {
            Alert.alert('Error', 'Unable to fetch profile data. Please try again later.');
            console.error(error);
        }
    };

    const handleSearch = () => {
        if (!searchInput.trim()) {
            Alert.alert('Error', 'Please enter a valid input to search.');
            return;
        }
        getFriends(searchInput.trim()); // Call getFriends with search input
    };

    const clearSearchResults = () => {
        setSearchResults([]); // Clear the search results when navigating away or clearing input
    };

    if (!profile) return <Text>Loading...</Text>;

    return (
        <SafeAreaView style={[styles.container, { height }]}>
            {/* Top Bar */}
            <View style={styles.TopBarNav}>
                <View>
                    <Text style={styles.WelcomeText}>Welcome</Text>
                    <Text style={[styles.WelcomeText, { fontWeight: 'bold', fontSize: 22, color: '#0077B6' }]}>{profile.common_name}</Text>
                </View>
                <TouchableOpacity onPress={() => clearSearchResults()}>
                    <FontAwesome name="bell-o" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {/* Search Bar Container */}
            <View style={styles.SearchBarContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholderTextColor="black"
                    textAlign="left"
                    placeholder="Search..."
                    onChangeText={setSearchInput} // Update search input state
                    onSubmitEditing={handleSearch} // Handle search on pressing Enter/Done
                />
                {/* Conditional rendering of search results */}
                {searchResults.length > 0 && (
                    <View style={styles.searchResultsContainer}>
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.friend_profile_id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.resultItem}
                                    onPress={() => {
                                        Alert.alert('Friend Selected', item.common_name);
                                    }}
                                >
                                    <Text style={styles.resultText}>{item.common_name}</Text>
                                    <Text style={styles.resultText}>{item.profile_title}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>



            {/* Content */}
            <View style={styles.content}>
                <View style={styles.AdPlaceholder}>
                    <Text>Advertisements</Text>
                </View>

                <View style={styles.CardsHolder}>

                    <TouchableOpacity style={styles.Card} onPress={() => navigation.navigate("EditCard")}>
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

    content: {
        flex: 0.9,
        paddingHorizontal: '5%',
        paddingTop: 5,
        paddingBottom: 20, // Add some bottom padding
        justifyContent: 'space-around',
        marginTop: 10, // Add space above the content
        marginBottom: 10, // Add space below the content
    },

    AdPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 15,
        marginTop: '1%',
        paddingVertical: '8%',
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
        paddingTop: 5,
        marginVertical: 5, // Add some vertical margin between the card holders
    },
    
    Card: {
        flex: 0.48,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        marginBottom: 5, // Add space between the individual cards
    },

    CardTextHolder: {
        marginBottom: 10,
    },

    CardText: {
        color: '#444242',
        fontSize: 11,
    },

    CardImage: {
        height: 80,
        alignItems: 'center',
        marginTop: 10,
    },

    ImageStyle: {
        width: 140,
        height: 80,
    },

    SearchBarContainer: {
        width: '90%',
        marginHorizontal: 'auto',
        marginTop: 10,
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingHorizontal: 15,
        elevation: 4, // Android shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        position: 'relative', // Base container is relatively positioned
        zIndex: 2, // Ensures it appears above other elements
    },
    
    searchInput: {
        height: 50,
        color: 'black',
        fontSize: 18,
    },
    
    searchResultsContainer: {
        position: 'absolute',
        top: 40, // Position results right below the search bar
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 2, // For Android shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        maxHeight: 300, // Optional: Limit height to prevent overflow
        zIndex: 3, // Ensure results appear above everything else
    },
    
    resultItem: {
        backgroundColor: '#FFF',
        padding: 10,
        marginLeft:1,
        marginRight:1,
        borderRadius: 10,
        marginVertical: 5,
        elevation: 1,
    },
    
    resultText: {
        fontSize: 16,
        color: '#444242',
    },
    
    
});


export default Home;
