import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import BottomNav from '../components/BottomNav'

type ProfileData = {
    user_id: number;
    common_name: string;
    designation: string;
    qualification: string;
    
    profile_id: number;
    profile_title: string;
    company_name: string;


    address1: string;
    address2?: string | null;
    city: string;
    country: string;
    pincode: string;

    email1: string;
    email2?: string | null;

    primary_phone: string;
    secondary_phone?: string | null;
}

type HomeProps = NativeStackScreenProps<RootStackParamList, 'FriendProfile'> 

const FriendProfile = ({navigation, route}: HomeProps) => {
    const { friend_id, remarks } = route.params;

    const [friendData, setFriendData] = useState<ProfileData>();

    const selectProfile = async (id: number) => {
        try {
            const response = await fetch(`https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/profile-data?data=${id}`);
            if (!response.ok) throw new Error('Failed to fetch profile data');
            const data = await response.json();
            console.log("Data: ", data)
            setFriendData(data);

        } catch (error) {
            Alert.alert('Error', 'Unable to fetch profile data. Please try again later.');
            console.error(error);
        }
    };

    useEffect(() => {

        selectProfile(friend_id)

    },[])
    

    if (!friendData) {
        return (
            <SafeAreaView style={[{ justifyContent: 'center', flex: 1, padding: 10, backgroundColor: '#F3FBFF' }]}>
                <ActivityIndicator size="large" color="blue" />
                <Text style={{ color: "black", textAlign: 'center', marginTop: 10 }}>
                    Loading...
                </Text>
            </SafeAreaView>
        );
    }

    const openWhatsApp = (phoneNumber: string) => {
        const url = `whatsapp://send?phone=91${phoneNumber}`;
    
        Linking.openURL(url)
          .then(() => {
            console.log('WhatsApp opened');
          })
          .catch((err) => {
            console.error('Error opening WhatsApp: ', err);
            Alert.alert('Error', 'WhatsApp is not installed on this device.');
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{ color: 'black', alignSelf:'center', marginTop:'4%', fontSize:32 }}>{friendData.profile_title}</Text>
                <Text style={{ color: 'black', alignSelf:'center', marginTop:'2%', fontSize:18 }}>Remarks: {remarks}</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.imageContainer}>
                        <View style={styles.userImage} />
                        <Text style={styles.imageText}>userImage</Text>
                    </View>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>logo</Text>
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.name}>{friendData.common_name}</Text>
                    <Text style={styles.qualification}>{friendData.qualification || "Qualification unknown"}</Text>
                    <Text style={styles.designation}>{friendData.designation || "Designation unknown"}</Text>
                    <Text style={styles.entityName}>{friendData.company_name}</Text>

                    {/* Contact Information */}
                    <View style={styles.contactContainer}>
                        <TouchableOpacity onPress={() => openWhatsApp(friendData.primary_phone)}>
                            <Text style={[styles.entityName, { color: 'blue', textDecorationLine: 'underline' }]}>
                                {friendData.primary_phone}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openWhatsApp(friendData.secondary_phone || friendData.primary_phone)}>
                            <Text style={[styles.entityName, { color: 'blue', textDecorationLine: 'underline' }]}>
                                {friendData.secondary_phone || "No secondary phone"}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.entityName}>{friendData.email1}</Text>
                        <Text style={styles.entityName}>{friendData.email2 || "No secondary email"}</Text>
                    </View>

                    {/* Address Section */}
                    <View style={styles.addressContainer}>
                        <Text style={styles.entityName}>{friendData.address1}</Text>
                        <Text style={styles.entityName}>{friendData.city} | {friendData.pincode} | {friendData.country}</Text>
                    </View>
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
        justifyContent: 'flex-start',
        gap:40
    },
    card: {
        flex:1,
        width: '80%',
        height: '70%',
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        marginBottom:"15%"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '15%',
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
        marginBottom: '0%',
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
        marginTop: '15%',
        marginBottom: '15%',
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

export default FriendProfile