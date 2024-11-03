import React, { useState } from 'react';
import {
    Alert,
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
import { useProfile } from '../components/ProfileContext';

type ViewCardProps = NativeStackScreenProps<RootStackParamList, 'ViewCard'> 

const ViewCard = ({navigation}: ViewCardProps) => {
    const { profile } = useProfile();
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getQR = async (id: number) => {
        try {
            const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/get-qr?data=${id}`);
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
                <View>
                    <Text style={{color: 'black'}}>{profile?.common_name}</Text>
                    <Text style={{ color: 'black' }}>{profile?.company_name}</Text>
                    <Text style={{ color: 'black' }}>{profile?.primary_phone}</Text>
                    <Text style={{ color: 'black' }}>{profile?.secondary_phone}</Text>
                    <Text style={{ color: 'black' }}>{profile?.email1}</Text>
                    <Text style={{ color: 'black' }}>{profile?.email2}</Text>
                    <Text style={{ color: 'black' }}>{profile?.address1}</Text>
                    <Text style={{ color: 'black' }}>{profile?.city}</Text>
                    <Text style={{ color: 'black' }}>{profile?.country}</Text>
                    <Text style={{ color: 'black' }}>{profile?.pincode}</Text>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', margin: 5, height:'8%'}}>
                    <TouchableOpacity
                        style={{backgroundColor:'green', width:'40%', borderRadius:20, justifyContent:'center'}}
                        onPress={() => {
                            if (profile?.profile_id !== undefined) {
                                getQR(profile.profile_id);
                            } else {
                                Alert.alert('Error', 'Profile ID is missing.');
                            }
                        }}
                    >
                        <Text style={{color:'black', alignSelf:'center'}}>SHARE</Text>
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
        gap:100
    },
    Card: {
        width: '80%',
        height: '60%',
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
        color: 'black',
        alignSelf: 'center',
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

export default ViewCard;
