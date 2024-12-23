import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData, saveUserData, removeUserData } from '../tasks/Storage';

interface UserContextData {
    userId: number | null;
    phone_number: string | null;
    profileIds: number[] | null;
    profileTitles: string[] | null;
    setUserContext: (context: {
        userId: number;
        phone_number: string;
        profileIds: number[];
        profileTitles: string[];
    }) => void;
    clearUserContext: () => void;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [userId, setUserId] = useState<number | null>(null);
    const [phone_number, setPhone_number] = useState<string | null>(null);
    const [profileIds, setProfileIds] = useState<number[] | null>(null);
    const [profileTitles, setProfileTitles] = useState<string[] | null>(null);

    // Load user context from AsyncStorage on mount
    useEffect(() => {
        const loadUserContext = async () => {
            const context = await getUserData();
            if (context) {
                setUserId(context.userId);
                setPhone_number(context.phone_number);
                setProfileIds(context.profileIds);
                setProfileTitles(context.profileTitles);
            }
        };
        loadUserContext();
    }, []);

    const setUserContext = (context: {
        userId: number;
        phone_number: string;
        profileIds: number[];
        profileTitles: string[];
    }) => {
        setUserId(context.userId);
        setProfileIds(context.profileIds);
        setProfileTitles(context.profileTitles);
        saveUserData(context); // Save in AsyncStorage
    };

    const clearUserContext = () => {
        setUserId(null);
        setProfileIds(null);
        setProfileTitles(null);
        removeUserData(); // Remove from AsyncStorage
    };

    return (
        <UserContext.Provider
            value={{
                userId,
                phone_number,
                profileIds,
                profileTitles,
                setUserContext,
                clearUserContext,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
