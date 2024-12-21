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
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import BottomNav from '../components/BottomNav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useProfile } from '../components/ProfileContext';

const { width, height } = Dimensions.get('window');
const calculatePercentage = (percentage: number, dimension: number) => (percentage / 100) * dimension;

type ScannedCardProps = NativeStackScreenProps<RootStackParamList, 'ScannedCardScreen'>;


const ScannedCardScreen = ({ navigation, route }: ScannedCardProps) => {
    
    const { profile } = useProfile();

    const { Name, designation, phone_number, email_id } = route.params;

    const [name, setName] = useState(Name || "Required");
    const [cardDesignation, setCardDesignation] = useState(designation || "NULL");
    const [primaryPhone, setPrimaryPhone] = useState(phone_number || "Required *");
    const [email1, setPrimay_email] = useState(email_id || "Required *");

    const [cardTitle, setTitle] = useState("");
    const [qualification, setQualification] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [secondaryPhone, setSecondaryPhone] = useState("");
    const [email2, setEmail2] = useState("");

    const [cardAddress, setAddress1] = useState("");
    const [cardCity, setCity] = useState("");
    const [cardPincode, setPincode] = useState("");
    const [cardCountry, setCountry] = useState("");

    const storeCard = async() => {
        if (!name.trim() || !cardTitle.trim() || !companyName.trim() || !primaryPhone.trim() || !email1.trim() || !cardAddress.trim() || !cardCity.trim() || !cardPincode.trim() || !cardCountry.trim()) {
            Alert.alert("Validation Error", "All required fields must be filled. Please check and try again.");
            return;
        }
        try {
            const response = await fetch('https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/store-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    profile_id: profile?.profile_id,
                    name: name,
                    card_designation: cardDesignation,
                    user_qualification: qualification,

                    title: cardTitle,
                    primary_phone: primaryPhone,
                    primary_email: email1,

                    company_name: companyName,
                    address: cardAddress,
                    city: cardCity,
                    pincode: cardPincode,
                    country: cardCountry,

                    secondary_phone: secondaryPhone,  
                    secondary_email: email2,                     
                }),
            });

            if (response.ok){
                navigation.navigate("Home");
                ToastAndroid.show('Card Stored Successfully', ToastAndroid.SHORT);
            }
        }
        catch (error) {
            ToastAndroid.show('Failed to connect to the server. Please try again later.', ToastAndroid.SHORT);
        }
    };



    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Header */}
            <View style={[styles.header]}>
                <View>
                    <Text style={styles.label}>TITLE <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={[styles.input,{ width: calculatePercentage(60, width)}]}
                        placeholder="Give a title for the card"
                        placeholderTextColor="#999"
                        value={cardTitle || ""}
                        onChangeText={setTitle}
                    />
                </View>
                <TouchableOpacity style={styles.doneButton} onPress={storeCard}>
                    <Text style={styles.doneButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

            {/* Profile Section */}
            <View style={styles.sectionContainer}>
                <View style={styles.profileSection}>
                    <View style={styles.profileDetails}>

                        {/* Name Input */}
                        <Text style={styles.label}>NAME <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter name"
                            placeholderTextColor="#999"
                            value={name || ""}
                            onChangeText={setName}
                        />

                        {/* Designation Input */}
                        <Text style={styles.label}>DESIGNATION</Text>
                        <TextInput
                                style={styles.input}
                                placeholder="Enter designation"
                                placeholderTextColor="#999"
                                value={cardDesignation || ""}
                                onChangeText={setCardDesignation}
                            />
                    </View>
                </View>
            </View>

            {/* Qualifications & Entity Section */}
            <View style={styles.sectionContainer}>          
                <Text style={styles.label}>QUALIFICATIONS</Text>
                <TextInput
                        style={styles.input}
                        placeholder="Enter qualifications"
                        placeholderTextColor="#999"
                        value={qualification || ''}
                        onChangeText={setQualification}
                    />

                    <Text style={styles.label}>COMPANY NAME <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter company name"
                        placeholderTextColor="#999"
                        value={companyName || ""}
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
                            value={primaryPhone || ""}
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
                            value={email1 || ""}
                            onChangeText={setPrimay_email}
                        />
                    </View>

                    <View style={styles.iconInputContainer}>
                        <Icon name="email" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                            style={styles.iconInput}
                            placeholder="Enter secondary email"
                            placeholderTextColor="#999"
                            value={email2 ||''}
                            onChangeText={setEmail2}
                        />
                </View>
            </View>

            {/* Address Section */}
            <View style={[styles.sectionContainer,{marginBottom: calculatePercentage(10, height)}]}>
                <Text style={styles.sectionTitle}>Address <Text style={styles.required}>*</Text></Text>
                <View style={[styles.Address1Container]}>
                    <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                    <TextInput
                            style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                            placeholder="Enter address"
                            placeholderTextColor="#999"
                            multiline
                            value={cardAddress || ''}
                            onChangeText={setAddress1}
                        />
                </View>
                <View style={{flexDirection:"row", gap:'20%'}}>
                    <View style={styles.CityContainer}>
                        <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                            style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                            placeholder="Enter city"
                            placeholderTextColor="#999"
                            value={cardCity || ''}
                            onChangeText={setCity}
                        />
                    </View>
                    <View style={styles.CityContainer}>
                        <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                        <TextInput
                            style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                            placeholder="Enter pincode"
                            placeholderTextColor="#999"
                            value={cardPincode || ''}
                            onChangeText={setPincode}
                        />
                    </View>
                </View>
                <View style={[styles.CountryContainer]}>
                    <Icon name="location-on" size={calculatePercentage(5, width)} color="#333" />
                    <TextInput
                        style={[styles.iconInput, { height: calculatePercentage(10, height) }]}
                        placeholder="Enter country"
                        placeholderTextColor="#999"
                        value={cardCountry || ''}
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
    required: {
        color: 'red',
        fontWeight: 'bold',
    },  
});

export default ScannedCardScreen;
