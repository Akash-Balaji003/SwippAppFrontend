import React, { useEffect, useState } from 'react';
import {
    Image,
    Modal,
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

interface UserInfo {
    userId: number;
    common_name: string;
    profile_id: number;
    profileTitle: string;
    address1: string;
    address2?: string | null;
    city: string;
    company_name: string;
    country: string;
    email1: string;
    email2?: string | null;
    pincode: string;
    primary_phone: string;
    secondary_phone?: string | null;
    username: string;
}


type QRCodeResultProps = NativeStackScreenProps<RootStackParamList, 'QRCodeResult'> 

const QRCodeResult = ({route, navigation}:QRCodeResultProps) => {

    const {QRResult} = route.params;
    const { profile } = useProfile();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(true); // Modal visibility
    const [remarks, setRemarks] = useState<string>('');

    useEffect(() => {
        // Assuming QRResult is a JSON string
        const data = typeof QRResult === 'string' ? JSON.parse(QRResult) : QRResult;
        setUserInfo(data);
    }, [QRResult]); // Depend on QRResult to update when it changes

    useEffect(() => {
        const data = typeof QRResult === 'string' ? JSON.parse(QRResult) : QRResult;
        setUserInfo(data);
    }, [QRResult]);

    const handleAddFriend = () => {
        if (userInfo && profile) {
            const url = `https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/add-friend?data1=${profile.profile_id}&data2=${userInfo.profile_id}&remarks=${remarks}`;
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Friend added successfully:', data);
                    setIsModalVisible(false); // Close the modal after API call
                })
                .catch((error) => {
                    console.error('Error adding friend:', error);
                });
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>

            {/* Modal for remarks */}
            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles2.modalContainer}>
                    <View style={styles2.modalContent}>
                        <Text style={styles2.modalTitle}>Add Remarks</Text>
                        <TextInput
                            style={styles2.remarksInput}
                            placeholder="Enter your remarks"
                            value={remarks}
                            onChangeText={setRemarks}
                        />
                        <TouchableOpacity
                            style={styles2.submitButton}
                            onPress={handleAddFriend}
                        >
                            <Text style={styles2.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.Card}>
                {userInfo ? (
                    <>
                        <Text>{userInfo.profile_id}</Text>
                        <Text>{userInfo.common_name}</Text>
                        <Text>{userInfo.company_name}</Text>
                        <Text>{userInfo.primary_phone}</Text>
                        <Text>{userInfo.secondary_phone}</Text>
                        <Text>{userInfo.email1}</Text>
                        <Text>{userInfo.email2}</Text>
                        <Text>{userInfo.address1}</Text>
                        <Text>{userInfo.city}</Text>
                        <Text>{userInfo.country}</Text>
                        <Text>{userInfo.pincode}</Text>
                    </>
                ) : (
                    <Text>No user information available.</Text>
                )}
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

const styles2 = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:"black"
    },
    remarksInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color:"black"
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default QRCodeResult;