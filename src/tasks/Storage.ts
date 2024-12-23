import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = 'user_data';
const USER_CONTEXT_KEY = 'user_context';


// Save user data in AsyncStorage
export const saveProfileData = async (userData: {
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
}) => {
    try {
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

// Retrieve user data from AsyncStorage
export const getProfileData = async () => {
    try {
        const userData = await AsyncStorage.getItem(USER_DATA_KEY);
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};

// Remove user data from AsyncStorage (e.g., when logging out)
export const removeProfileData = async () => {
    try {
        await AsyncStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
        console.error('Error removing user data:', error);
    }
};

// Save user context in AsyncStorage
export const saveUserData = async (context: {
    userId: number;
    phone_number: string;
    profileIds: number[];
    profileTitles: string[];
}) => {
    try {
        await AsyncStorage.setItem(USER_CONTEXT_KEY, JSON.stringify(context));
    } catch (error) {
        console.error('Error saving user context:', error);
    }
};

// Retrieve user context from AsyncStorage
export const getUserData = async () => {
    try {
        const userContext = await AsyncStorage.getItem(USER_CONTEXT_KEY);
        return userContext ? JSON.parse(userContext) : null;
    } catch (error) {
        console.error('Error retrieving user context:', error);
        return null;
    }
};

// Remove user context from AsyncStorage (e.g., on logout)
export const removeUserData = async () => {
    try {
        await AsyncStorage.removeItem(USER_CONTEXT_KEY);
    } catch (error) {
        console.error('Error removing user context:', error);
    }
};