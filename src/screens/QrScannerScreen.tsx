import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type QrProps = NativeStackScreenProps<RootStackParamList, 'QRCodeScanner'>;

const QRCodeScanner = ({ navigation }: QrProps) => {
    const [showCamera, setShowCamera] = useState<boolean>(false);
    const device = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        const requestPermission = async () => {
            const permission = await Camera.requestCameraPermission();
            if (permission === 'granted') {
                setShowCamera(true);
            } else {
                navigation.goBack();
            }
        };

        requestPermission();
    }, [navigation]);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            // Filter to get only QR codes
            const qrCodes = codes.filter(code => code.type === 'qr');
    
            if (qrCodes.length > 0) {
                // Navigate to another screen with the scanned QR code data
                const qrCodeValue = qrCodes[0].value; // Get the first QR code value
                console.log(`Scanned QR code data: ${qrCodeValue}`);
                
                // Navigate to another screen (e.g., 'QRCodeResult') and pass the QR code value
                navigation.navigate('QRCodeResult', { QRResult: qrCodeValue });

                // Stop scanning
                setShowCamera(false);
            } else {
                console.log('No QR codes scanned.');
            }
        }
    });

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto();
                console.log('Photo taken:', photo);
            } catch (error) {
                console.error('Failed to take photo:', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {showCamera && device ? (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={cameraRef}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={showCamera}
                        photo={true}
                        codeScanner={codeScanner}
                    />
                    <View style={styles.overlayContainer}>
                        {/* Scanner Outline */}
                        <View style={styles.scannerOutline} />

                        {/* Camera Controls */}
                        <View style={styles.cameraControls}>
                            <TouchableOpacity
                                onPress={takePicture}
                                style={styles.captureButton}
                            >
                                <Text style={styles.buttonText}>Capture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={styles.exitButton}
                            >
                                <Text style={styles.buttonText}>Exit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    overlayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerOutline: {
        width: '70%',
        height: '40%',
        borderWidth: 3,
        borderColor: 'rgba(0, 150, 255, 0.7)',
        borderRadius: 15,
        opacity: 0.7,
    },
    cameraControls: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    captureButton: {
        backgroundColor: '#00A4E4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginHorizontal: 10,
        elevation: 5,
    },
    exitButton: {
        backgroundColor: '#E60000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginHorizontal: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default QRCodeScanner;
