import { View, Text, SafeAreaView, StyleSheet, Alert, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import BottomNav from '../components/BottomNav'
import { SearchCards } from '../components/SearchBar'
import { useProfile } from '../contexts/ProfileContext'

const { width, height } = Dimensions.get("window");

// Helper function for percentage calculation
const calculatePercentage = (percentage: number, dimension: number) => (percentage / 100) * dimension;

type Card = {
    card_id: number;
    name: string;
    title: string;
    company_name: string;
    remarks: string;
    
};

type SavedCardsProps = NativeStackScreenProps<RootStackParamList, 'SavedCards'> 

const SavedCards = ({navigation}:SavedCardsProps) => {

        
    const { profile } = useProfile();  // State to store the fetched user data
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/get-cards?data=${profile?.profile_id}`);
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error('Error fetching cards:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const renderCard = ({ item }: { item: Card }) => (
        <TouchableOpacity style={styles.card} onPress={ () => handleCardClick(item.card_id)}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardCompany}>Card: {item.title}</Text>
            </View>
            <Text style={styles.cardCompany}>{item.company_name}</Text>
            <Text style={styles.cardRemarks}>{item.remarks}</Text>
        </TouchableOpacity>
    );

    const handleCardClick = async(id: number) => {
        navigation.navigate("CardView", {card_id:id})
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ color: 'black', alignSelf:'center', marginTop:'5%', fontSize:32 }}>Saved Cards</Text>

            {/* Search Bar Container */}
            <View style={styles.searchBarContainer}>
                <SearchCards navigation={navigation}/>
            </View>

            {/* Cards List */}
            <View style={styles.listContainer}>
                {loading ? (
                    <SafeAreaView style={[{ justifyContent: 'center', flex: 1, padding: 10, backgroundColor: '#F3FBFF' }]}>
                        <ActivityIndicator size="large" color="#555" />
                        <Text style={{ color: "#555", textAlign: 'center', marginTop: 8 }}>
                            Loading...
                        </Text>
                    </SafeAreaView>
                ) : (
                    <FlatList
                        data={cards}
                        keyExtractor={(item) => item.card_id.toString()}
                        renderItem={renderCard}
                        contentContainerStyle={styles.flatListContent}
                    />
                )}
            </View>

            {/* Bottom Navigation */}
            <BottomNav navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3FBFF",
        justifyContent: 'flex-start',
        gap:30
    },
    searchBarContainer: {
        position: "absolute",
        marginTop: calculatePercentage(11, height),
        width: "100%",
        zIndex:1,
        alignSelf:"center",
        marginBottom:60
    },
    title: {
        color: 'black',
        alignSelf: 'center',
        marginTop: '5%',
        fontSize: 32,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: calculatePercentage(8, height),

    },
    flatListContent: {
        paddingBottom: 20,
    },
    loadingText: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDesignation: {
        fontSize: 14,
        color: '#777',
    },
    cardCompany: {
        fontSize: 14,
        color: '#555',
    },
    cardRemarks: {
        fontSize: 12,
        color: '#999',
    },
});

export default SavedCards