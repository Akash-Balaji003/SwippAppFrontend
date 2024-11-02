import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
} from 'react-native';

import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import BottomNav from '../components/BottomNav';

type QrProps = NativeStackScreenProps<RootStackParamList, 'QRCodeScanner'>;

const QRCodeScanner = ({ navigation }: QrProps) => {
    const [showCamera, setShowCamera] = useState<boolean>(false);
    const device = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);

    const openCamera = async () => {
        const permission = await Camera.requestCameraPermission();
        if (permission === 'granted') {
            setShowCamera(true);
        } else {
            console.log("Camera permission denied");
        }
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto();
                console.log('Photo taken:', photo);
                // Add any further handling of the photo here
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
                    />
                    <View style={styles.cameraControls}>
                        <TouchableOpacity
                            onPress={takePicture}
                            style={styles.captureButton}
                        >
                            <Text style={styles.buttonText}>Capture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowCamera(false)}
                            style={styles.exitButton}
                        >
                            <Text style={styles.buttonText}>Exit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <TouchableOpacity
                    onPress={openCamera}
                    style={styles.openCameraButton}
                >
                    <Text style={styles.buttonText}>Open Camera</Text>
                </TouchableOpacity>
            )}
            <BottomNav navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3FBFF",
    },
    openCameraButton: {
        justifyContent: 'center',
        backgroundColor: 'cyan',
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20%',
        height: 40,
    },
    buttonText: {
        alignSelf: 'center',
    },
    cameraControls: {
        position: 'absolute',
        bottom: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 1,
    },
    captureButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    exitButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
});

export default QRCodeScanner;
