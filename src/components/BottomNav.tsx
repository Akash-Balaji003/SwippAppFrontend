import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useUser } from '../contexts/UserContext';
import { useProfile } from '../contexts/ProfileContext';

type BottomNavProps = {
    navigation: NativeStackNavigationProp<any>;
};

const BottomNav = ({navigation}:BottomNavProps) => {
    const { setProfile, profile } = useProfile();
    
    const { phone_number, profileIds, profileTitles } = useUser();
    
        const [switchProfileTitles, setSwitchProfileTitles] = useState(profileTitles || []);
        const [switchProfileIds, setSwitchProfileIds] = useState(profileIds || []);
        const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
    
    
        const [qrCode, setQrCode] = useState<string | null>(null);
        const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
        const [isQRModalVisible, setIsQRModalVisible] = useState(false);
    

    const handleShare = async() => {
        console.log("working... ", profileTitles)
        console.log("working... ", switchProfileTitles)
        setIsProfileModalVisible(true);
        console.log("modal...")
    };

    const getQR = async (id: number) => {
        try {
            console.log("ID : ", id)
            const response = await fetch(`https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/get-qr?data=${id}`);
            if (!response.ok) throw new Error('Failed to fetch QR code');
            const QRcode = await response.json();
            setQrCode(QRcode.qr_code_base64);
            setIsQRModalVisible(true);  // Show the modal with the QR code
        } catch (error) {
            Alert.alert('Error', 'Unable to fetch QR code. Please try again later.');
            console.error(error);
        }
    };
    
    const handleProfileSelection = (id: number) => {
        console.log("Be4 setting setSelectedProfileId ");
        setSelectedProfileId(id);
        console.log("After setting setSelectedProfileId ");
        setIsProfileModalVisible(false); // Close the profile selection modal
        console.log("Be4 getting qr ");
        getQR(id); // Fetch and show the QR code for the selected profile
        console.log("after getting qr ");
    };

    if (!useUser || !profileIds) {
            return (
                <SafeAreaView style={[{ justifyContent: 'center', flex: 1, padding: 10, backgroundColor: '#2B2B2B' }]}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={{ color: "white", textAlign: 'center', marginTop: 10 }}>
                        Loading...
                    </Text>
                </SafeAreaView>
            );
        }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.BottomNav}>
                <TouchableOpacity style={styles.NavButton} onPress={() => navigation.navigate("Home")}>
                    <Feather name="home" size={28} color="#444242" />
                    <Text style={styles.ButtonText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NavButton}>
                    <MaterialIcons name="qr-code-scanner" size={28} color="#444242" onPress={() => navigation.navigate('QRCodeScanner')} />
                    <Text style={styles.ButtonText}>Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NavButton}>
                    <AntDesign name="idcard" size={28} color="#444242" onPress={handleShare} />
                    <Text style={styles.ButtonText}>Show QR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NavButton} onPress={() => navigation.navigate('UserProfile')}>
                    <Feather name="user" size={28} color="#444242" />
                    <Text style={styles.ButtonText}>Profile</Text>
                </TouchableOpacity>
            </View>

        {/* Profile Selection Modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isProfileModalVisible}
                onRequestClose={() => setIsProfileModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color:"black" }}>Select a Profile</Text>
                        {profileTitles?.map((title, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.profileButton}
                                onPress={() => handleProfileSelection(profileIds[index])}
                            >
                                <Text style={styles.profileText}>{title}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsProfileModalVisible(false)}
                        >
                            <Text style={styles.buttonTextModal}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for QR Code */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isQRModalVisible}
                onRequestClose={() => setIsQRModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {qrCode ? (
                            <Image
                                source={{ uri: `data:image/png;base64,${qrCode}` }}
                                style={styles.qrCodeImage}
                            />
                        ) : (
                            <Text style={{ color: 'black' }}>Loading...</Text>
                        )}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsQRModalVisible(false)}
                        >
                            <Text style={styles.buttonTextModal}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

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
        borderTopColor: '#ccc',
    },

    container: {
        backgroundColor:"pink",
    },

    NavButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    ButtonText: {
        color: '#444242',
        fontSize: 12,
    },

    profileButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 5,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
        width:"70%"
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dim background
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    qrCodeImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop:20
    },
    buttonTextModal: {
        color: '#fff',
        alignSelf: 'center',
        marginTop:'auto',
        marginBottom:'auto',
    },
    profileText: {
        color: '#001f3f',
        fontSize: 16,
    },

});

export default BottomNav;