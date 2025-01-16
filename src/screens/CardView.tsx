import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
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

type Card = {
    name: string;
    card_designation: string;
    primary_phone: string;
    primary_email: string;
    title: string;
    user_qualification: string;
    company_name: string;
    secondary_phone?: string;
    secondary_email?: string;
    address: string;
    city: string;
    pincode: string;
    country: string;
    remarks: string;
};


type CardViewProps = NativeStackScreenProps<RootStackParamList, 'CardView'> 

const CardView = ({navigation, route}: CardViewProps) => {
    const { card_id } = route.params;
    const [cardData, setCardData] = useState<Card>();

    const selectCard = async (id: number) => {
        try {
            const response = await fetch(`https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/card-data?data=${id}`);
            if (!response.ok) throw new Error('Failed to fetch profile data');
            const data = await response.json();
            setCardData(data);
            console.log("Data: ", cardData?.name)

        } catch (error) {
            Alert.alert('Error', 'Unable to fetch profile data. Please try again later.');
            console.error(error);
        }
    };

    useEffect(() => {
    
        selectCard(card_id)

    },[])

    if (!cardData) {
            return (
                <SafeAreaView style={[{ justifyContent: 'center', flex: 1, padding: 10, backgroundColor: '#F3FBFF' }]}>
                    <ActivityIndicator size="large" color="blue" />
                    <Text style={{ color: "black", textAlign: 'center', marginTop: 10 }}>
                        Loading...
                    </Text>
                </SafeAreaView>
            );
        }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{ color: 'black', alignSelf:'center', marginTop:'4%', fontSize:32 }}>{cardData.title}</Text>
                <Text style={{ color: 'black', alignSelf:'center', marginTop:'2%', fontSize:18 }}>Remarks: {cardData.remarks}</Text>
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
                    <Text style={styles.name}>{cardData.name}</Text>
                    <Text style={styles.qualification}>{cardData.user_qualification || "Qualification unknown"}</Text>
                    <Text style={styles.designation}>{cardData.card_designation ||"Designation unknown"}</Text>
                    <Text style={styles.entityName}>{cardData.company_name}</Text>

                    {/* Contact Information */}
                    <View style={styles.contactContainer}>
                        <Text style={styles.entityName}>{cardData.primary_phone}</Text>
                        <Text style={styles.entityName}>{cardData.secondary_phone || "No secondary phone number"}</Text>
                        <Text style={styles.entityName}>{cardData.primary_email}</Text>
                        <Text style={styles.entityName}>{cardData.secondary_email || "No secondary email"}</Text>
                    </View>

                    {/* Address Section */}
                    <View style={styles.addressContainer}>
                        <Text style={styles.entityName}>{cardData.address}</Text>
                        <Text style={styles.entityName}>{cardData.city} | {cardData.pincode} | {cardData.country}</Text>
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
        width: '80%',
        height: '70%',
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        marginBottom:'15%'
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
        marginBottom: '10%',
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
        marginTop: '10%',
        marginBottom: '10%',
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

export default CardView;
