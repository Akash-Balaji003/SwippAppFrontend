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
                <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                    <Text>bell</Text>
                </View>
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
                    <View style={styles.Buttons}>
                        <Text style={[styles.ButtonText, {marginBottom:5}]}>icon</Text>
                        <Text style={styles.ButtonText}>Edit</Text>
                    </View>
                    <View style={styles.Buttons}>
                        <Text style={[styles.ButtonText, {marginBottom:5}]}>icon</Text>
                        <Text style={styles.ButtonText}>Edit</Text>
                    </View>
                    <View style={styles.Buttons}>
                        <Text style={[styles.ButtonText, {marginBottom:5}]}>icon</Text>
                        <Text style={styles.ButtonText}>Edit</Text>
                    </View>
                    <View style={styles.Buttons}>
                        <Text style={[styles.ButtonText, {marginBottom:5}]}>icon</Text>
                        <Text style={styles.ButtonText}>Edit</Text>
                    </View>
                </View>

                <View style={styles.Ad2_Placeholder}>
                    <Text>Advertisements</Text>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.BottomNav}>

                {/* Left navigation buttons */}
                <TouchableOpacity style={styles.NavButton}>
                    <Text style={styles.ButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.NavButton}>
                    <Text style={styles.ButtonText}>Friends</Text>
                </TouchableOpacity>

                {/* Center scan button */}
                <View style={styles.CenterButton}>
                    <View style={styles.CircleButton}>
                        <View style={styles.CircleButtonInner}>
                            <TouchableOpacity>
                                <Text style={styles.ButtonText}>SCAN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Right navigation buttons */}
                <TouchableOpacity style={styles.NavButton}>
                    <Text style={styles.ButtonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.NavButton}>
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
        backgroundColor: 'yellow',
        width: '95%',
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
        bottom: 20,  // To make it stick out from the navbar
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
        width: '93%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3%',
        backgroundColor: '#0B2545',
        borderRadius: 15,
    },

    searchInput: {
        color: 'black',
        height: 55,
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
        width: '93%',
        height: '60%',
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'grey',
        borderRadius: 15,
    },

    Ad2_Placeholder: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width: '93%',
        height: '110%',
        marginTop: '4.5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'grey',
        borderRadius: 15,
    },

    Card: {
        width: '93%',
        height: '125%',
        marginTop: '1%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'cyan',
        borderRadius: 15,
    },

    YourCard: {
        width: '93%',
        marginLeft: '4%',
        marginTop: '5%',
    },

    ButtonHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        width: '93%',
        height: '43%',
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'cyan',
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
