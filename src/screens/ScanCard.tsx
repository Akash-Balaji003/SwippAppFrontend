import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import RNFS from 'react-native-fs';

type ScanCardProps = NativeStackScreenProps<RootStackParamList, 'ScanCard'>;

const ScanCard = ({ navigation }: ScanCardProps) => {
    const [text, setText] = useState('');
    const [imageUri, setImageUri] = useState('');
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

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto();
                console.log('Photo taken:', photo);

                let imageUriWithPrefix = `file://${photo.path}`;
                setImageUri(imageUriWithPrefix);

                console.log('Photo path for ML:', imageUriWithPrefix);

                const recognizedTextResult = await TextRecognition.recognize(imageUriWithPrefix); // Perform text recognition
                const recognizedText = recognizedTextResult.text || '';
                setText(recognizedText);
                console.log("Result: ", recognizedText);
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
                    {text && (
                        <View style={{ position: 'absolute', bottom: 100, left: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10 }}>
                        <Text style={{ color: 'white' }}>{text}</Text>
                        </View>
                    )}
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

export default ScanCard;
