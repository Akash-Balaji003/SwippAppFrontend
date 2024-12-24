import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Alert, ViewBase } from 'react-native';
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useProfile } from '../contexts/ProfileContext';
import { saveUserData } from '../tasks/Storage';
import { useUser } from '../contexts/UserContext';

const UserProfile = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'UserProfile'>) => {
    const { setProfile, profile } = useProfile();
    const { phone_number, profileIds, profileTitles } = useUser();

    const [UserPhone, setUserPhone] = useState(phone_number || "");
    const [switchProfileTitles, setSwitchProfileTitles] = useState(profileTitles || []);
    const [switchProfileIds, setSwitchProfileIds] = useState(profileIds || []);

    const profileCount = switchProfileIds.length;


    const selectProfile = async (id: number) => {
        try {
            const response = await fetch(`https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/profile-data?data=${id}`);
            if (!response.ok) throw new Error('Failed to fetch profile data');
            const profileData = await response.json();

            setProfile(profileData);  // Set the profile data in context
            await saveUserData(profileData);
            navigation.navigate('Home');  // Navigate to Home without parameters

        } catch (error) {
            Alert.alert('Error', 'Unable to fetch profile data. Please try again later.');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        {/* Status Bar */}
        <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />

        {/* Header Section */}
        <View style={styles.header}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>
            <TouchableOpacity>
                <Icon name="edit" size={24} color="black" />
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.container}>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <View style={styles.profileInfo}>
                    <View style={styles.profileImageWrapper}>
                    <Image
                        source={{
                        uri: 'https://via.placeholder.com/100',
                        }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.overlayButton}>
                        <Icon name="qr-code" size={20} color="white" />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.nameDetails}>
                    <Text style={styles.name}>{profile?.common_name}</Text>
                    </View>
                </View>

                <View style={styles.stats}>
                    <View style={styles.statItem}>
                    <Text style={styles.statValue}>52</Text>
                    <Text style={styles.statLabel}>Connections</Text>
                    </View>
                    <View style={styles.statItem}>
                    <Text style={styles.statValue}>{profileCount}</Text>
                    <Text style={styles.statLabel}>Profiles</Text>
                    </View>
                </View>
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
                <Text style={styles.label}>Primary contact number</Text>
                <Text style={styles.info}>{UserPhone}</Text>
                <Text style={styles.label}>Primary email address</Text>
                <Text style={styles.info}>{profile?.email1}</Text>
            </View>

            {/* Switch Profile Section */}
            <View style={styles.switchProfileSection}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={styles.label}>Switch profile</Text>
                    <TouchableOpacity style={[styles.addButton, ]}>
                        <Icon name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {switchProfileTitles.map((title, index) => (
                    <View>
                        <TouchableOpacity key={index} style={styles.profileButton} onPress={() => selectProfile(switchProfileIds[index])}>
                            <Text style={styles.profileText}>{title}</Text>
                        </TouchableOpacity>
                    </View>
                    
                ))}
            </View>
        </ScrollView>
        <BottomNav navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileText: {
        color: '#001f3f',
        fontSize: 16,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    container: {
        paddingHorizontal: 16,
        marginBottom:50
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
        paddingHorizontal:10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',

    },
    profileSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    profileInfo: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profileImageWrapper: {
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    overlayButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007BFF',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameDetails: {
        alignItems: 'center',
        marginTop: 8,
    },
    name: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    qualification: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
    designation: {
        fontSize: 16,
        color: '#555',
        marginTop: 2,
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf:"center",
        marginTop:-20,
        gap:25
    },
    statItem: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',

    },
    statLabel: {
        fontSize: 14,
        color: '#555',
    },
    infoSection: {
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginTop: 10,
    },
    info: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    switchProfileSection: {
        marginVertical: 20,
    },
    switchProfileRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileButtonsWrapper: {
        flex: 1,
    },
    profileButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 5,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
        width:"70%"
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        width: 35,
        height: 35,
        borderRadius: 17.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});

export default UserProfile;

