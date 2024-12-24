import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useProfile } from '../contexts/ProfileContext';

// Define the type for the user
interface User {
    friend_profile_id: number;
    profile_title: string;
    common_name: string;
    remarks: string;
}

const SearchUser = () => {
    const { profile } = useProfile();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);  // Use the User type here

    useEffect(() => {
        console.log('Search Query:', searchQuery);
        if (searchQuery.length >= 3) {  // Start searching after 3 characters
            fetch(`https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/friends/search/?profile_id=${profile?.profile_id}&search_query=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched data:', data);  // Log the data to see its structure
                    setUsers(data);
                })
                .catch(error => console.error('Error fetching friends:', error));
        } else {
            setUsers([]);  // Clear the dropdown if the search query is less than 3 characters
        }
    }, [searchQuery, profile?.profile_id]);
    

    const handleUserClick = (friend_profile_id: number, common_name: string) => {
        // Show an alert to confirm sending a friend request
        Alert.alert(
            "Send Friend Request",
            `Send a friend request to ${common_name}?`,
            [
                {
                    text: "Cancel", // Cancel button to close the alert
                    style: "cancel"
                },
                {
                    text: "OK", // OK button to send the request
                    onPress: () => sendFriendRequest(friend_profile_id, common_name) // Call the function to send the request
                }
            ]
        );
    };
    
    // Function to call the API for sending the friend request
    const sendFriendRequest = async (recipientId: number, common_name: string) => {
        setSearchQuery('');
        setUsers([]);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search for a name, remarks, or profile title..."
                value={searchQuery}
                onChangeText={setSearchQuery}  // Update the search query as the user types
                style={styles.searchInput}
                placeholderTextColor="#A0A0A0"  // Light gray placeholder text color
            />
            <FlatList
                data={users}
                keyExtractor={(item) => item.friend_profile_id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleUserClick(item.friend_profile_id, item.common_name)} style={styles.card}>
                        <Text style={styles.username}>{item.common_name}</Text>
                        <Text style={styles.profileTitle}>{item.profile_title}</Text>
                        <Text style={styles.remarks}>{item.remarks}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3FBFF',  // Dark background to match the theme '#1c1c1e'
        paddingHorizontal:10

    },
    searchInput: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#A0D8FF',  // Light blue border to match the light theme
        borderRadius: 8,
        backgroundColor: '#FFFFFF',  // White background for the search bar for a clean, bright look
        fontSize: 16,
        color: '#333',  // Dark text for contrast
        marginBottom: 0,  // Remove margin to eliminate space between the input and the list
    },
    listContainer: {
        paddingTop: 1,  // Remove any extra padding at the top of the list
    },
    card: {
        padding: 15,
        marginBottom: 1,
        backgroundColor: '#FFFFFF',  // White background for the card
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E1E1',  // Light grey border for the cards
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    username: {
        fontSize: 16,
        fontWeight: '500',  // Lighter font weight to make it less bold and more elegant
        color: '#333',  // Dark text for the username
    },
    profileTitle: {
        fontSize: 14,
        color: '#bbb',  // Slightly lighter color for the profile title
    },
    remarks: {
        fontSize: 12,
        color: '#888',  // Lighter color for remarks
    },
});

export default SearchUser;
