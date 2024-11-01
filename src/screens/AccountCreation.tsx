import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import { RootStackParamList } from '../App';
import AntDesign from 'react-native-vector-icons/AntDesign';

type AccProps = NativeStackScreenProps<RootStackParamList, 'AccountCreation'>;

const AccountCreation = ({ navigation }: AccProps) => {
    const { width, height } = useWindowDimensions();

    return (
        <SafeAreaView style={[styles.container, { width, height }]}>
            {/* Step Indicator */}
            <View style={[styles.stepContainer, { width: Platform.OS === 'ios' ? '90%' : 'auto', marginLeft: Platform.OS === 'ios' ? '5%' : '0%'}]}>
                <View style={styles.stepItem}>
                    <View style={styles.activeStepCircle}>
                        <Text style={styles.stepText}>1</Text>
                    </View>
                    <Text style={styles.stepLabel}>Creating account</Text>
                </View>
                <View style={styles.stepItem}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepText}>2</Text>
                    </View>
                    <Text style={styles.stepLabel}>About you</Text>
                </View>
                <View style={styles.stepItem}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepText}>3</Text>
                    </View>
                    <Text style={styles.stepLabel}>About your company</Text>
                </View>
            </View>

            {/* Form Title */}
            <Text style={styles.title}>CREATING ACCOUNT</Text>

            {/* Input Fields */}
            <View style={[styles.inputContainer, { width: Platform.OS === 'ios' ? '80%' : 'auto'}]}>
                <TextInput placeholder="Name" style={styles.input} placeholderTextColor="#888" />
                <TextInput placeholder="Mobile number" style={styles.input} placeholderTextColor="#888" keyboardType="phone-pad" />
                <TextInput placeholder="Password" style={styles.input} placeholderTextColor="#888" secureTextEntry />
                <TextInput placeholder="Confirm password" style={styles.input} placeholderTextColor="#888" secureTextEntry />
            </View>

            {/* Next Button */}
            <View style={[{flexDirection:'row', justifyContent:'space-between'}]}>
                <TouchableOpacity style={[styles.buttonBack]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonArrow]} onPress={() => navigation.navigate('AboutYou')}>
                    <AntDesign name="arrowright" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        paddingHorizontal: '10%',
    },
    stepContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5%',
    },
    stepItem: {
        alignItems: 'center',
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeStepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#E6F4F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepText: {
        fontSize: 14,
        color: 'black',
    },
    stepLabel: {
        fontSize: 12,
        color: 'black',
        marginTop: 5,
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
        marginLeft: Platform.OS ==='ios' ? 'auto': '0%',
        marginRight: Platform.OS ==='ios' ? 'auto': '0%',
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#001f3f',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: Platform.OS ==='ios' ? 'auto': '0%',
        marginRight: Platform.OS ==='ios' ? 'auto': '0%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonBack: {
        backgroundColor: '#001f3f',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        width:'50%'
    },
    buttonArrow: {
        backgroundColor: '#001f3f',
        borderRadius: 50,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        width: 50
    },
});

export default AccountCreation;
