import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
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
import BottomNav from '../components/BottomNav';
import { useProfile } from '../contexts/ProfileContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const calculatePercentage = (percentage: number, dimension: number) => (percentage / 100) * dimension;

type EditCardProps = NativeStackScreenProps<RootStackParamList, 'EditCard'>;


const EditCard = ({ navigation }: EditCardProps) => {
    const { profile } = useProfile();

    // State for editable fields
    const [profileTitle, setProfileTitle] = useState(profile?.profile_title);
    const [user_qualification, setQualification] = useState(profile?.qualification);
    const [user_designation, setDesignation] = useState(profile?.designation);
    const [companyName, setCompanyName] = useState(profile?.company_name);
    const [primaryPhone, setPrimaryPhone] = useState(profile?.primary_phone);
    const [primary_email, setEmail1] = useState(profile?.email1);
    const [secondaryPhone, setSecondaryPhone] = useState(profile?.secondary_phone);
    const [secondary_email, setEmail2] = useState(profile?.email2);
    const [address, setAddress1] = useState(profile?.address1);
    const [city, setCity] = useState(profile?.city);
    const [pincode, setPincode] = useState(profile?.pincode);
    const [country, setCountry] = useState(profile?.country);

    const handleDone = async () => {
        // Prepare the payload
        const updatedProfile = {
            profile_id: profile?.profile_id,
            profile_title: profileTitle,
            primary_phone: primaryPhone,
            secondary_phone: secondaryPhone ?? null,
            email1: primary_email,
            email2: secondary_email ?? null,
            address1:address,
            company_name: companyName,
            designation: user_designation ?? null,  // Handle undefined or null as null
            qualification: user_qualification ?? null,
            city: city,
            pincode: pincode,
            country: country
        };

        console.log("DATA", updatedProfile);
    
        try {
            const response = await fetch('https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/update-profile', {
                method: 'POST', // Use PUT for updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfile),
            });
    
            if (!response.ok) {
                const errorDetails = await response.json();
                console.log("Error Details:", errorDetails);
                throw new Error('Failed to update profile');
            }
    
            const data = await response.json();
            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack(); // Navigate back to the previous screen
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };
    

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{profile?.profile_title}</Text>
                <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                    <Text style={styles.doneButtonText}>DONE</Text>
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
                            placeholder={profile?.common_name}
                            placeholderTextColor="#999"
                            editable={false}
                        />

                        {/* Designation Input */}
                        <Text style={styles.label}>DESIGNATION</Text>
                        <TextInput
                                style={styles.input}
                                placeholder="Enter your designation"
                                placeholderTextColor="#999"
                                value={user_designation || ''}
                                onChangeText={setDesignation}
                            />
                    </View>

                    {/* Profile Image Section */}
                    <View style={styles.profileImageSection}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/100' }}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.editImageButton} onPress={() => {
                                        Alert.alert('Coming soon...');
                                    }}>
                            <Text style={styles.editImageText}>Edit Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Qualifications & Entity Section */}
            <View style={styles.sectionContainer}>          
                <Text style={styles.label}>QUALIFICATIONS</Text>
                <TextInput
                        style={styles.input}
                        placeholder="Enter your qualifications"
                        placeholderTextColor="#999"
                        value={user_qualification || ''}
                        onChangeText={setQualification}
                    />

                    <Text style={styles.label}>COMPANY NAME</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your company name"
                        placeholderTextColor="#999"
                        value={companyName || ''}
                        onChangeText={setCompanyName}
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
                            placeholder="Enter primary phone"
                            placeholderTextColor="#999"
                            value={primaryPhone || ''}
                            onChangeText={setPrimaryPhone}
                        />
                    </View>

                    <View style={styles.iconInputContainer}>
                        <Icon name="phone" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                            style={styles.iconInput}
                            placeholder="Enter secondary phone"
                            placeholderTextColor="#999"
                            value={secondaryPhone || ''}
                            onChangeText={setSecondaryPhone}
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
                            placeholder="Enter primary email"
                            placeholderTextColor="#999"
                            value={primary_email || ''}
                            onChangeText={setEmail1}
                        />
                    </View>

                    <View style={styles.iconInputContainer}>
                        <Icon name="email" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                            style={styles.iconInput}
                            placeholder="Enter secondary email"
                            placeholderTextColor="#999"
                            value={secondary_email || ''}
                            onChangeText={setEmail2}
                        />
                </View>
            </View>

            {/* Address Section */}
            <View style={[styles.sectionContainer,{marginBottom: calculatePercentage(10, height)}]}>
                <Text style={styles.sectionTitle}>Address</Text>
                <View style={[styles.Address1Container]}>
                    <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                    <TextInput
                            style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                            placeholder="Enter your address"
                            placeholderTextColor="#999"
                            multiline
                            value={address || ''}
                            onChangeText={setAddress1}
                        />
                </View>
                <View style={{flexDirection:"row", gap:'20%'}}>
                    <View style={styles.CityContainer}>
                        <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                            style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                            placeholder="Enter your city"
                            placeholderTextColor="#999"
                            value={city || ''}
                            onChangeText={setCity}
                        />
                    </View>
                    <View style={styles.CityContainer}>
                        <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                            style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                            placeholder="Enter your pincode"
                            placeholderTextColor="#999"
                            value={pincode || ''}
                            onChangeText={setPincode}
                        />
                    </View>
                </View>
                <View style={[styles.CountryContainer]}>
                    <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                    <TextInput
                        style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                        placeholder="Enter your country"
                        placeholderTextColor="#999"
                        value={country || ''}
                        onChangeText={setCountry}
                    />
                </View>
                
            </View>

        </ScrollView>
        <BottomNav navigation={navigation} />
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    container: {
      flex: 1,
      paddingHorizontal: '5%',
    },
    header: {
      flexDirection: 'row',
      paddingHorizontal: '5%',
      justifyContent: 'space-between',
      alignItems: 'center',
      height:'auto',
      marginTop: calculatePercentage(2, height),
      marginBottom: calculatePercentage(3, height),
    },
    headerText: { color: 'black', alignSelf:'center', fontSize:32 },
    doneButton: {
      backgroundColor: '#007BFF',
      borderRadius: 8,
      paddingVertical: calculatePercentage(2, height),
      paddingHorizontal: calculatePercentage(4, width),
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
    editImageButton: {
      marginTop: calculatePercentage(3, height),
      backgroundColor: '#007BFF',
      borderRadius: 8,
      paddingVertical: calculatePercentage(1, height),
      paddingHorizontal: calculatePercentage(4, width),
    },
    editImageText: {
      color: '#fff',
      fontWeight: 'bold',
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

export default EditCard;
