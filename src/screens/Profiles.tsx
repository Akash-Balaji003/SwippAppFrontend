import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
    Platform,
    Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type ProfilesProps = NativeStackScreenProps<RootStackParamList, 'Profiles'>;

const Profiles = ({ route, navigation }: ProfilesProps) => {
    const { width, height } = useWindowDimensions();
    const { profileTitles } = route.params;
    const { profileIds } = route.params;


    const selectProfile = async (id: number) => {
        try {
            const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/profile-data?data=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }
            const profileData = await response.json();

            console.log('Parsed data:', profileData);
            
            navigation.navigate('Home', {
                userId: profileData.userId,
                name: profileData.name,
                profileId: profileData.profileId,
                profileTitle: profileData.profileTitle,
                address1: profileData.address1,
                address2: profileData.address2,
                city: profileData.city,
                companyName: profileData.companyName,
                country: profileData.country,
                email1: profileData.email1,
                email2: profileData.email2,
                pincode: profileData.pincode,
                primaryPhone: profileData.primaryPhone,
                secondaryPhone: profileData.secondaryPhone,
                username: profileData.username,
            });

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
