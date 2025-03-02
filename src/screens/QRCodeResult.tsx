import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
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

import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNav from '../components/BottomNav';
import { useProfile } from '../contexts/ProfileContext';
import { getLocation } from '../components/LocationFetcher';

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

const { width, height } = Dimensions.get('window');
const calculatePercentage = (percentage: number, dimension: number) => (percentage / 100) * dimension;

type QRCodeResultProps = NativeStackScreenProps<RootStackParamList, 'QRCodeResult'> 

const QRCodeResult = ({route, navigation}:QRCodeResultProps) => {

    const [location, setLocation] = useState<string>('');

    const {QRResult} = route.params;
    const { profile } = useProfile();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(true); // Modal visibility
    const [remarks, setRemarks] = useState<string>('');

    useEffect(() => {
        const data = typeof QRResult === 'string' ? JSON.parse(QRResult) : QRResult;
        setUserInfo(data);
        fetchLocation();
    }, [QRResult]);

    const fetchLocation = async () => {
        try {
          const loc = await getLocation();
          setLocation(loc.placeName);
        } catch (error: any) {
          Alert.alert('Error', error.message);
        }
    };

    const handleAddFriend = () => {
        if (userInfo && profile && location) {
            const url = `https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/add-friend?data1=${profile.profile_id}&data2=${userInfo.profile_id}&remarks=${remarks || "NULL"}&location=${location}`;
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
        <SafeAreaView style={styles.safeArea}>

            {/* Header */}
            <View style={[styles.header]}>
                <Text style={{ color: 'black', alignSelf:'center', marginBottom:'5%', fontSize:28 }} onPress={fetchLocation}>{userInfo?.common_name || "Friend"}'s Card</Text>
                <TouchableOpacity style={styles.doneButton} onPress={handleAddFriend}>
                    <Text style={styles.doneButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

                {/* Profile Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.profileSection}>
                        <View style={styles.profileDetails}>

                            {/* Name Input */}
                            <Text style={styles.label}>NAME</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#999"
                                value={userInfo?.common_name || ""}
                                editable={false}
                            />

                            {/* Designation Input */}
                            <Text style={styles.label}>DESIGNATION</Text>
                            <TextInput
                                    style={styles.input}
                                    placeholderTextColor="#999"
                                    value={"NULL"}
                                    editable={false}
                                />
                        </View>
                    </View>
                </View>

                {/* Qualifications & Entity Section */}
                <View style={styles.sectionContainer}>          
                    <Text style={styles.label}>QUALIFICATIONS</Text>
                    <TextInput
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={'NULL'}
                            editable={false}
                        />

                        <Text style={styles.label}>COMPANY NAME</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={userInfo?.company_name || "NULL"}
                            editable={false}
                        />
                </View>

                {/* Contact Details Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Contact Details</Text>

                    {/* Primary Phone */}
                    <View style={styles.iconInputContainer}>
                        <Icon name="phone" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                                style={styles.iconInput}
                                placeholderTextColor="#999"
                                value={userInfo?.primary_phone || "NULL"}
                                editable={false}
                            />
                        </View>

                        <View style={styles.iconInputContainer}>
                            <Icon name="phone" size={calculatePercentage(5, width)} color="#333" />
                            <TextInput
                                style={styles.iconInput}
                                placeholderTextColor="#999"
                                value={userInfo?.secondary_phone || 'NULL'}
                                editable={false}
                            />
                    </View>
                </View>

                {/* Mail Details Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Mail Details</Text>

                    {/* Primary Email */}
                    <View style={styles.iconInputContainer}>
                        <Icon name="email" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                                style={styles.iconInput}
                                placeholderTextColor="#999"
                                value={userInfo?.email1 || "NULL"}
                                editable={false}
                            />
                        </View>

                        <View style={styles.iconInputContainer}>
                            <Icon name="email" size={calculatePercentage(5, width)} color="#333" />
                            <TextInput
                                style={styles.iconInput}
                                placeholderTextColor="#999"
                                value={userInfo?.email2 || 'NULL'}
                                editable={false}
                            />
                    </View>
                </View>

                {/* Address Section */}
                <View style={[styles.sectionContainer,{marginBottom: calculatePercentage(5, height)}]}>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <View style={[styles.Address1Container]}>
                        <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                                style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                                placeholderTextColor="#999"
                                multiline
                                value={userInfo?.address1 || 'NULL'}
                                editable={false}
                            />
                    </View>
                    <View style={{flexDirection:"row", gap:'20%'}}>
                        <View style={styles.CityContainer}>
                            <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                            <TextInput
                                style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                                placeholderTextColor="#999"
                                value={userInfo?.city || 'NULL'}
                                editable={false}
                            />
                        </View>
                        <View style={styles.CityContainer}>
                            <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                            <TextInput
                                style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                                placeholderTextColor="#999"
                                value={userInfo?.pincode || 'NULL'}
                                editable={false}
                            />
                        </View>
                    </View>
                    <View style={[styles.CountryContainer]}>
                        <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                            style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                            placeholderTextColor="#999"
                            value={userInfo?.country || 'NULL'}
                            editable={false}
                        />
                    </View>
                    
                </View>

                {/* Remarks Section */}
                <View style={[styles.sectionContainer,{marginBottom: calculatePercentage(5, height)}]}>
                    <Text style={styles.sectionTitle}>Remarks</Text>
    
                    {/* Primary Email */}
                    <View style={styles.iconInputContainer}>
                        <Icon name="edit" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                            style={styles.iconInput}
                            placeholder="Enter your remarks"
                            placeholderTextColor="#999"
                            value={remarks}
                            onChangeText={setRemarks}
                        />
                    </View>
                </View>

            </ScrollView>
            {/* Bottom Navigation */}
            <BottomNav navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    container: {
      flex: 1,
      paddingHorizontal: '4%',
      marginBottom:'15%'
    },
    header: {
      flexDirection: 'row',
      paddingHorizontal: '5%',
      justifyContent: 'space-between',
      alignItems: 'center',
      height:'auto',
      marginTop: calculatePercentage(2, height),
      marginBottom: calculatePercentage(0.1, height),
    },
    headerText: { color: 'black', alignSelf:'center', fontSize:32 },
    doneButton: {
      backgroundColor: '#007BFF',
      borderRadius: 8,
      paddingVertical: calculatePercentage(2, height),
      paddingHorizontal: calculatePercentage(4, width),
      marginBottom: calculatePercentage(1, height),
    },
    doneButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    sectionContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: calculatePercentage(4, width),
      marginBottom: calculatePercentage(5, height),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2, // for Android shadow
    },
    sectionTitle: {
      fontSize: calculatePercentage(4, width),
      fontWeight: 'bold',
      marginBottom: calculatePercentage(1, height),
      color: '#333',
    },
    profileSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    profileDetails: {
      flex: 1,
      marginRight: calculatePercentage(4, width),
    },
    profileImageSection: {
      alignItems: 'center',
    },
    profileImage: {
      width: calculatePercentage(25, width),
      height: calculatePercentage(25, width),
      borderRadius: calculatePercentage(50, width),
      backgroundColor: '#ddd',
    },
    label: {
      fontSize: calculatePercentage(3.5, width),
      fontWeight: 'bold',
      marginBottom: calculatePercentage(0.5, height),
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: calculatePercentage(3, width),
      marginBottom: calculatePercentage(4, height),
      backgroundColor: '#fff',
      fontSize: calculatePercentage(3.5, width),
      color: '#333',
    },
    iconInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: calculatePercentage(3, width),
      marginBottom: calculatePercentage(4, height),
      backgroundColor: '#fff',
    },
    Address1Container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: calculatePercentage(0, width),
        marginBottom: calculatePercentage(2, height),
        backgroundColor: '#fff',
    },
    CountryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: calculatePercentage(0, width),
        marginBottom: calculatePercentage(1, height),
        backgroundColor: '#fff',
        marginTop:-30,
    },
    CityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        height:"50%",
        width:'49%',
        marginBottom: calculatePercentage(2, height),
        backgroundColor: '#fff',
    },

    iconInput: {
      flex: 1,
      marginLeft: calculatePercentage(3, width),
      fontSize: calculatePercentage(3.5, width),
      color: '#333',
    },
});

export default QRCodeResult;