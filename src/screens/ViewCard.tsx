import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import BottomNav from '../components/BottomNav';
import { useProfile } from '../contexts/ProfileContext';

const { width, height } = Dimensions.get('window');
const calculatePercentage = (percentage: number, dimension: number) => (percentage / 100) * dimension;

type ViewCardProps = NativeStackScreenProps<RootStackParamList, 'ViewCard'> 

const ViewCard = ({navigation}: ViewCardProps) => {
    const { profile } = useProfile();
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getQR = async (id: number) => {
        try {
            const response = await fetch(`https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/get-qr?data=${id}`);
            if (!response.ok) throw new Error('Failed to fetch QR code');
            const QRcode = await response.json();
            setQrCode(QRcode.qr_code_base64);
            setIsModalVisible(true);  // Show the modal with the QR code
        } catch (error) {
            Alert.alert('Error', 'Unable to fetch QR code. Please try again later.');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ color: 'black', alignSelf:'center', marginTop:'5%', fontSize:32 }}>{profile?.profile_title}</Text>
            <View style={styles.Card}>
            <View style={styles2.header}>
                    <View style={styles2.imageContainer}>
                        <View style={styles2.userImage} />
                        <Text style={styles2.imageText}>userImage</Text>
                    </View>
                    <View style={styles2.logoContainer}>
                        <Text style={styles2.logoText}>logo</Text>
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles2.infoSection}>
                    <Text style={styles2.name}>{profile?.common_name}</Text>
                    <Text style={styles2.qualification}>qualification</Text>
                    <Text style={styles2.designation}>designation</Text>
                    <Text style={styles2.entityName}>{profile?.company_name}</Text>
                    <Text style={styles2.entitySubname}>entitySubname</Text>

                    {/* Contact Information */}
                    <View style={styles2.contactContainer}>
                        <Text style={styles2.entityName}>{profile?.primary_phone}</Text>
                        <Text style={styles2.entityName}>{profile?.email1}</Text>
                        <Text style={styles2.entityName}>{profile?.secondary_phone}</Text>
                        <Text style={styles2.entityName}>{profile?.email2}</Text>
                    </View>

                    {/* Address Section */}
                    <View style={styles2.addressContainer}>
                        <Text style={styles2.entityName}>{profile?.address1}</Text>
                        <Text style={styles2.entityName}>{profile?.city} | {profile?.pincode} | {profile?.country}</Text>
                    </View>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', margin: 5, height:'8%'}}>
                    <TouchableOpacity
                        style={styles2.editImageButton}
                        onPress={() => {
                            if (profile?.profile_id !== undefined) {
                                getQR(profile.profile_id);
                            } else {
                                Alert.alert('Error', 'Profile ID is missing.');
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>SHARE</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal for QR Code */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
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
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Bottom Navigation */}
            <BottomNav navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3FBFF",
        justifyContent: 'flex-start',
        gap:50
    },
    Card: {
        width: '80%',
        height: '70%',
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: 15,
        padding: 10,
        elevation: 4,
    },
    editButton: {
        backgroundColor: 'grey',
        width: '40%',
    },
    shareButton: {
        backgroundColor: 'green',
        width: '40%',
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        alignSelf: 'center',
        marginTop:'auto',
        marginBottom:'auto',
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
    },
});

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F1F8",
        padding: '5%',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: '5%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%',
    },
    imageContainer: {
        alignItems: 'flex-start',
        marginRight:'auto',
    },
    userImage: {
        width: '50%', // Increased size
        aspectRatio: 1,
        backgroundColor: '#D3D3D3',
        borderRadius: 40,
        marginBottom: '2%',
    },
    imageText: {
        fontSize: 12,
        color: '#666',
        marginLeft:'4%'
    },
    logoContainer: {
        width: '40%', // Increased size
        aspectRatio: 2,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    logoText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    infoSection: {
        marginBottom: '5%',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: '1%',
    },
    qualification: {
        fontSize: 16,
        color: '#666',
        marginBottom: '1%',
    },
    designation: {
        fontSize: 14,
        color: '#666',
        marginBottom: '3%',
    },
    entityName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    entitySubname: {
        fontSize: 14,
        color: '#666',
        marginBottom: '5%',
    },
    contactContainer: {
        marginBottom: '5%',
        color: 'black',
    },
    addressContainer: {
        marginBottom: '5%',
        color: 'black',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footerLink: {
        fontSize: 14,
        color: '#3A86FF',
        textDecorationLine: 'underline',
    },
    editImageButton: {
        marginTop: '2%',
        backgroundColor: '#007BFF',
        borderRadius: 8,
        height:"90%",
        width: "50%",
        alignContent:'center'
      },
      editImageText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign:'center',
        alignSelf:'center',
        alignContent:'center'
      },
});

export default ViewCard;
