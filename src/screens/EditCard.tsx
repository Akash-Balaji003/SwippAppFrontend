import React, { useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import BottomNav from '../components/BottomNav';
import { useProfile } from '../components/ProfileContext';

type EditCardProps = NativeStackScreenProps<RootStackParamList, 'EditCard'>;

const ViewCard = ({ navigation }: EditCardProps) => {
    const { profile } = useProfile();

    // State for editable fields
    const [profileTitle, setProfileTitle] = useState(profile?.profile_title || '');
    const [commonName, setCommonName] = useState(profile?.common_name || '');
    const [qualification, setQualification] = useState('qualification');
    const [designation, setDesignation] = useState('designation');
    const [companyName, setCompanyName] = useState(profile?.company_name || '');
    const [entitySubname, setEntitySubname] = useState('entitySubname');
    const [primaryPhone, setPrimaryPhone] = useState(profile?.primary_phone || '');
    const [email1, setEmail1] = useState(profile?.email1 || '');
    const [secondaryPhone, setSecondaryPhone] = useState(profile?.secondary_phone || '');
    const [email2, setEmail2] = useState(profile?.email2 || '');
    const [address1, setAddress1] = useState(profile?.address1 || '');
    const [city, setCity] = useState(profile?.city || '');
    const [pincode, setPincode] = useState(profile?.pincode || '');
    const [country, setCountry] = useState(profile?.country || '');
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getQR = async (id: number) => {
        try {
            const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/get-qr?data=${id}`);
            if (!response.ok) throw new Error('Failed to fetch QR code');
            const QRcode = await response.json();
            setQrCode(QRcode.qr_code_base64);
            setIsModalVisible(true); // Show the modal with the QR code
        } catch (error) {
            Alert.alert('Error', 'Unable to fetch QR code. Please try again later.');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={{ color: 'black', alignSelf:'center', marginTop:'5%', fontSize:32 }}
                value={profileTitle}
                onChangeText={setProfileTitle}
                placeholder="Profile Title"
            />
            <View style={styles.Card}>
                <View style={styles2.header}>
                    <View style={styles2.imageContainer}>
                        <View style={styles2.userImage} />
                        <TextInput
                            style={styles2.imageText}
                            value="userImage"
                            editable={false}
                        />
                    </View>
                    <View style={styles2.logoContainer}>
                        <TextInput
                            style={styles2.logoText}
                            value="logo"
                            editable={false}
                        />
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles2.infoSection}>
                    <TextInput
                        style={styles2.name}
                        value={commonName}
                        onChangeText={setCommonName}
                        placeholder="Name"
                    />
                    <TextInput
                        style={styles2.qualification}
                        value={qualification}
                        onChangeText={setQualification}
                        placeholder="Qualification"
                    />
                    <TextInput
                        style={styles2.designation}
                        value={designation}
                        onChangeText={setDesignation}
                        placeholder="Designation"
                    />
                    <TextInput
                        style={styles2.entityName}
                        value={companyName}
                        onChangeText={setCompanyName}
                        placeholder="Company Name"
                    />
                    <TextInput
                        style={styles2.entitySubname}
                        value={entitySubname}
                        onChangeText={setEntitySubname}
                        placeholder="Entity Subname"
                    />

                    {/* Contact Information */}
                    <View style={styles2.contactContainer}>
                        <TextInput
                            style={styles2.entityName}
                            value={primaryPhone}
                            onChangeText={setPrimaryPhone}
                            placeholder="Primary Phone"
                        />
                        <TextInput
                            style={styles2.entityName}
                            value={email1}
                            onChangeText={setEmail1}
                            placeholder="Email 1"
                        />
                        <TextInput
                            style={styles2.entityName}
                            value={secondaryPhone}
                            onChangeText={setSecondaryPhone}
                            placeholder="Secondary Phone"
                        />
                        <TextInput
                            style={styles2.entityName}
                            value={email2}
                            onChangeText={setEmail2}
                            placeholder="Email 2"
                        />
                    </View>

                    {/* Address Section */}
                    <View style={styles2.addressContainer}>
                        <TextInput
                            style={styles2.entityName}
                            value={address1}
                            onChangeText={setAddress1}
                            placeholder="Address"
                        />
                        <TextInput
                            style={styles2.entityName}
                            value={`${city} | ${pincode} | ${country}`}
                            onChangeText={(text) => {
                                const [newCity, newPincode, newCountry] = text.split('|').map((t) => t.trim());
                                setCity(newCity || '');
                                setPincode(newPincode || '');
                                setCountry(newCountry || '');
                            }}
                            placeholder="City | Pincode | Country"
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 5, height: '8%' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'green', width: '40%', borderRadius: 20, justifyContent: 'center' }}
                        onPress={() => {
                            if (profile?.profile_id !== undefined) {
                                getQR(profile.profile_id);
                            } else {
                                Alert.alert('Error', 'Profile ID is missing.');
                            }
                        }}
                    >
                        <TextInput
                            style={{ color: 'black', alignSelf: 'center' }}
                            value="SHARE"
                            editable={false}
                        />
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
                            <TextInput style={{ color: 'black' }} value="Loading..." editable={false} />
                        )}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <TextInput style={styles.buttonText} value="CLOSE" editable={false} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Bottom Navigation */}
            <BottomNav navigation={navigation} />
        </SafeAreaView>
    );
};

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
});

export default ViewCard;
