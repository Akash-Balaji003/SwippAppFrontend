import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, Platform, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useProfile } from '../components/ProfileContext';

type ProfilesProps = NativeStackScreenProps<RootStackParamList, 'Profiles'>;

const Profiles = ({ route, navigation }: ProfilesProps) => {
    const { width, height } = useWindowDimensions();
    const { profileTitles, profileIds } = route.params;
    const { setProfile } = useProfile();

    const selectProfile = async (id: number) => {
        try {
            const response = await fetch(`https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/profile-data?data=${id}`);
            if (!response.ok) throw new Error('Failed to fetch profile data');
            const profileData = await response.json();

            setProfile(profileData);  // Set the profile data in context
            navigation.navigate('Home');  // Navigate to Home without parameters

        } catch (error) {
            Alert.alert('Error', 'Unable to fetch profile data. Please try again later.');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { width, height }]}>
            <View style={[styles.inputContainer, { width: Platform.OS === 'ios' ? '80%' : 'auto' }]}>
                <Text style={styles.title}>PROFILES</Text>
                {profileTitles.map((title, index) => (
                    <TouchableOpacity key={index} style={styles.profileButton} onPress={() => selectProfile(profileIds[index])}>
                        <Text style={styles.profileText}>{title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        paddingHorizontal: '10%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#001f3f',
        textAlign: 'center',
        marginBottom: '5%',
    },
    inputContainer: {
        width: '100%',
        marginLeft: Platform.OS === 'ios' ? 'auto' : '0%',
        marginRight: Platform.OS === 'ios' ? 'auto' : '0%',
    },
    profileButton: {
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16,
        marginVertical: 10,
        alignItems: 'center',
    },
    profileText: {
        color: '#001f3f',
        fontSize: 16,
    },
});

export default Profiles;
