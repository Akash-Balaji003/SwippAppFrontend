import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import { RootStackParamList } from '../App';

import AntDesign from 'react-native-vector-icons/AntDesign';

type AboutCompanyProps = NativeStackScreenProps<RootStackParamList, 'AboutCompany'>;

const AboutCompany = ({ route, navigation }: AboutCompanyProps) => {
    const { width, height } = useWindowDimensions();

    const { common_name, phone_number, password, profile_title, primary_phone, email1 } = route.params;

    const [ company_name, setCompanyName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ pincode, setPincode ] = useState('');
    const [ country, setCountry ] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const registerUser = async() => {
        try {
            const response = await fetch('https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    common_name: common_name,
                    phone_number: phone_number,
                    password: password,

                    profile_title: profile_title,
                    primary_phone: primary_phone,
                    email1: email1,

                    company_name: company_name,
                    address1: address,
                    city: city,
                    pincode: pincode,
                    country: country,

                    secondary_phone: null,  
                    email2: null,                     
                    address2: null,
                }),
            });

            if (response.ok){
                navigation.navigate("Login");
                ToastAndroid.show('Account Created Successfully', ToastAndroid.SHORT);
            }
        }
        catch (error) {
            setErrorMessage('Failed to connect to the server. Please try again later.');
            ToastAndroid.show('Failed to connect to the server. Please try again later.', ToastAndroid.SHORT);
        }
    };

    const handleNext = async () => {
        if (!company_name || !address || !city || !pincode || !country) {
            setErrorMessage("All fields are required.");
            return;
        }
    
        // Clear error message if validations pass
        setErrorMessage("");
        registerUser();
    };

    return (
        <SafeAreaView style={[styles.container, { width, height }]}>
            {/* Step Indicator */}
            <View style={[styles.stepContainer, { width: Platform.OS === 'ios' ? '90%' : 'auto', marginLeft: Platform.OS === 'ios' ? '5%' : '0%'}]}>
                <View style={styles.stepItem}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepText}>1</Text>
                    </View>
                    <Text style={styles.stepLabel}>Creating account</Text>
                </View>
                <View style={styles.stepItem}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepText}>2</Text>
                    </View>
                    <Text style={styles.stepLabel}>About you</Text>
                </View>
                <View style={styles.stepItem}>
                    <View style={styles.activeStepCircle}>
                        <Text style={styles.stepText}>3</Text>
                    </View>
                    <Text style={styles.stepLabel}>About your company</Text>
                </View>
            </View>

            {/* Form Title */}
            <Text style={[styles.title, {marginBottom:'1%'}]}>ABOUT YOUR COMPANY</Text>
            <Text style={[styles.title, {fontSize:13, fontWeight:'300', paddingHorizontal:30}]}><AntDesign name="infocirlceo" size={12} color="black" /> Details entered hence forth will be mentioned in your card. You can edit it later in profile section</Text>

            {/* Input Fields */}
            <View style={[styles.inputContainer, { width: Platform.OS === 'ios' ? '80%' : 'auto'}]}>
                <TextInput placeholder="Company Name" value={company_name} onChangeText={setCompanyName} style={styles.input} placeholderTextColor="#888" />
                <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} placeholderTextColor="#888" />
                <View style={[{flexDirection:'row', justifyContent:'space-between'}]}>
                    <TextInput placeholder="City" value={city} onChangeText={setCity} style={[styles.input, {width:"45%"}]} placeholderTextColor="#888" />
                    <TextInput placeholder="Pincode" value={pincode} onChangeText={setPincode} style={[styles.input, {width:"45%"}]} placeholderTextColor="#888" keyboardType='phone-pad' />
                </View>
                <TextInput placeholder="Country" value={country} onChangeText={setCountry} style={styles.input} placeholderTextColor="#888" keyboardType='email-address' />
                <Text style={[styles.stepLabel, {alignSelf:'center', color:'red'}]}>{errorMessage}</Text>
            </View>

            {/* Next Button */}
            <View style={[{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:30}]}>
                <TouchableOpacity style={[styles.buttonBack]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonArrow]} onPress={handleNext}>
                    <AntDesign name="arrowright" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        paddingHorizontal: '10%',
    },
    stepContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5%',
    },
    stepItem: {
        alignItems: 'center',
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeStepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#E6F4F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepText: {
        fontSize: 14,
        color: 'black',
    },
    stepLabel: {
        fontSize: 12,
        color: 'black',
        marginTop: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#001f3f',
        textAlign: 'center',
        marginBottom: '1%',
    },
    inputContainer: {
        width: '100%',
        marginLeft: Platform.OS ==='ios' ? 'auto': '0%',
        marginRight: Platform.OS ==='ios' ? 'auto': '0%',
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        color:'black',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        marginVertical: 10,
    },
    buttonBack: {
        backgroundColor: '#001f3f',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        width:'50%'
    },
    buttonArrow: {
        backgroundColor: '#001f3f',
        borderRadius: 50,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        width: 50
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AboutCompany;
