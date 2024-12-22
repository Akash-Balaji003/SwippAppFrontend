import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserProfile = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'UserProfile'>) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
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
              <Text style={styles.name}>Liam Neeson</Text>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>52</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Profiles</Text>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Primary contact number</Text>
          <Text style={styles.info}>+91 7550032424</Text>
          <Text style={styles.label}>Secondary contact number</Text>
          <Text style={styles.info}>+91 7550032424</Text>
          <Text style={styles.label}>Primary email address</Text>
          <Text style={styles.info}>akashbalajitvr@gmail.odd</Text>
          <Text style={styles.label}>Secondary email address</Text>
          <Text style={styles.info}>akashbalajitvr@gmail.odd</Text>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.info}>SIS Danube, Pallikaranai, Chennai 600100</Text>
        </View>

        {/* Switch Profile Section */}
        <View style={styles.switchProfileSection}>
          <Text style={styles.label}>Switch profile</Text>
          <View style={styles.switchProfileRow}>
            <View style={styles.profileButtonsWrapper}>
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.buttonText}>Accountant</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.buttonText}>Home Baker</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.buttonText}>Home Baker</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.buttonText}>Tuition Teacher</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Icon name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007BFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default UserProfile;

