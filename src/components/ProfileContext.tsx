import React, { createContext, useContext, useState } from 'react';

interface ProfileData {
    userId: number;
    common_name: string;
    profileId: number;
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

interface ProfileContextProps {
    profile: ProfileData | null;
    setProfile: (profileData: ProfileData) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [profile, setProfile] = useState<ProfileData | null>(null);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
