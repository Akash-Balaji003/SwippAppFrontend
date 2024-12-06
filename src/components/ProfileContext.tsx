import React, { createContext, useContext, useState } from 'react';

interface ProfileData {
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
