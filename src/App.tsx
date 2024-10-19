import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function App(): React.JSX.Element {
    return (
        <SafeAreaView style={styles.container}>

            {/* Top Bar */}
            <View style={styles.TopBarNav}>
                <View>
                    <View>
                        <Text style={styles.WelcomeText}>Welcome</Text>
                    </View>
                    <View>
                        <Text style={[styles.WelcomeText, { fontWeight: 'bold', fontSize: 18 }]}>Ravi Swaminathan</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <FontAwesome name="bell-o" size={30} color="black" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.SeachBar}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.searchInput}
                        placeholderTextColor='black'
                        textAlign='left'
                        placeholder="Search..."
                    />
                </View>
            </View>

            {/* Content */}
            <ScrollView style={styles.content}>
                <View style={styles.Ad1_Placeholder}>
                    <Text>Advertisements</Text>
                </View>

                <View style={styles.YourCard}>
                    <Text>Your card</Text>
                </View>

                <View style={styles.Card}></View>

                <View style={styles.ButtonHolder}>
                    <TouchableOpacity style={styles.Buttons}>
                        <EvilIcons name="share-google" size={35} color="white" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
                        <Text style={styles.ButtonText}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Buttons}>
                        <AntDesign name="edit" size={32} color="white" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
                        <Text style={styles.ButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Buttons}>
                        <AntDesign name="qrcode" size={32} color="white" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
                        <Text style={styles.ButtonText}>QR</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.Ad2_Placeholder}>
                    <Text>Advertisements</Text>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.BottomNav}>

                {/* Left navigation buttons */}
                <TouchableOpacity style={styles.NavButton}>
                    <Feather name="home" size={28} color="white" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
                    <Text style={styles.ButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.NavButton}>
                    <Feather name="users" size={28} color="white" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
                    <Text style={styles.ButtonText}>Friends</Text>
                </TouchableOpacity>

                {/* Center scan button */}
                <View style={styles.CenterButton}>
                    <View style={styles.CircleButton}>
                        <View style={styles.CircleButtonInner}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="qrcode-scan" size={32} color="white" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={[styles.ButtonText, {marginLeft:'auto', marginRight:'auto', marginTop:'7%'}]}>Scan</Text>
                </View>

                {/* Right navigation buttons */}
                <TouchableOpacity style={styles.NavButton}>
                    <Ionicons name="chatbox-ellipses-outline" size={28} color="white" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
                    <Text style={styles.ButtonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.NavButton}>
                    <Feather name="user" size={28} color="white" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
                    <Text style={styles.ButtonText}>Profile</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    TopBarNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: '6%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '4%',
    },

    BottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#1F2D47',  // Updated background color for navbar
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
  
    // For regular nav buttons
    NavButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Center button container
    CenterButton: {
        bottom: 30,  // To make it stick out from the navbar
        alignSelf: 'center',
    },

    // Circle style for center button
    CircleButton: {
        width: 80,
        height: 80,
        backgroundColor: '#fafafa',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,  // For Android shadow
        shadowColor: '#000',  // For iOS shadow
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    CircleButtonInner: {
        width: 70,
        height: 70,
        backgroundColor: '#1F2D47',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,  // For Android shadow
        shadowColor: '#000',  // For iOS shadow
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    WelcomeText: {
        color: "#0B2545",
        fontSize: 16,
    },

    SeachBar: {
        flexDirection: 'row',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3%',
        backgroundColor: '#0B2545',
        borderRadius: 15,
    },

    searchInput: {
        color: 'black',
        height: 50,
        width: '100%',
        borderRadius: 15,
        opacity: 0.5,
        backgroundColor: '#00A3FF',
        fontSize: 18,
    },

    Ad1_Placeholder: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width: '90%',
        height: '60%',
        marginTop: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'grey',
        borderRadius: 15,
    },

    Ad2_Placeholder: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width: '90%',
        height: '100%',
        marginTop: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'grey',
        borderRadius: 15,
    },

    Card: {
        width: '90%',
        height: '120%',
        marginTop: '1%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'grey',
        borderRadius: 15,
    },

    YourCard: {
        width: '90%',
        marginLeft: '4%',
        marginTop: '5%',
    },

    ButtonHolder: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 50,
        width: '90%',
        height: '35%',
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 15,
    },

    Buttons: {
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        width: '16%',
        height: '100%',
        backgroundColor: '#0B2545',
        borderRadius: 8,
    },

    ButtonText:{
        color:'white'
    },

    content: {
        flex: 1,  // Makes sure the ScrollView takes up the available space
    },
});

export default App;
