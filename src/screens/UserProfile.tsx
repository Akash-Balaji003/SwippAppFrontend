import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';

const UserProfile = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'UserProfile'>) => {
  return (
    <SafeAreaView style={{flex:1}}>
        <Text style={styles.textColour}>Profile screen on the works...</Text>
        <BottomNav navigation={navigation} />

    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  textColour: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 5,
    textAlign:"center"
  },
});

export default UserProfile;

