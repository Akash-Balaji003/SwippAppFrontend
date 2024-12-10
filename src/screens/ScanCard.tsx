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
import ImageCropPicker from 'react-native-image-crop-picker';

type ScanCardProps = NativeStackScreenProps<RootStackParamList, 'ScanCard'>;

const ScanCard = ({ navigation }: ScanCardProps) => {


    
    const [designations, setDesignations] = useState<string[]>([]);

    useEffect(() => {
        const fetchDesignations = async () => {
            const response = await fetch('https://digicard-backend-deg0gdhzbjamacad.southeastasia-01.azurewebsites.net/get-designations');
            const data = await response.json();
            console.log('Fetched Designations:', data);
            setDesignations(data);
        };

        fetchDesignations();
    }, []);

    const isDesignation = (line: string): boolean => {
        const lowerCaseLine = line.toLowerCase();
        return designations.some((designation) =>
            lowerCaseLine.includes(designation.toLowerCase())
        );
    };

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
                console.log('Original Photo Path:', imageUriWithPrefix);
    
                // Define cropping rectangle based on the scanner outline dimensions and position
                const cropWidth = photo.width * 0.7; // Adjust based on the scanner outline's size
                const cropHeight = photo.height * 0.4;
                const cropX = (photo.width - cropWidth) / 2;
                const cropY = (photo.height - cropHeight) / 2;
    
                // Use the cropping library
                const croppedImage = await ImageCropPicker.openCropper({
                    path: imageUriWithPrefix,
                    width: cropWidth,
                    height: cropHeight,
                    cropperCircleOverlay: false,
                    cropping: true,
                    cropperToolbarTitle: 'Crop Image',
                    mediaType: 'photo'
                });
    
                console.log('Cropped Image Path:', croppedImage.path);
                setImageUri(`file://${croppedImage.path}`);
    
                // Perform text recognition on the cropped image
                const recognizedTextResult = await TextRecognition.recognize(`file://${croppedImage.path}`);
                const recognizedText = recognizedTextResult.text || '';
                setText(recognizedText);
                console.log("Result: ", recognizedText);
                const finalResult = classifyText(recognizedText);
                navigation.navigate("ScannedCardScreen", {
                    Name: finalResult.name,
                    designation: finalResult.designation,
                    phone_number: finalResult.phone,
                    email_id: finalResult.email
                });
    
            } catch (error) {
                console.error('Failed to take or process photo:', error);
            }
        }
    }; 
    
    const classifyText = (text: string) => {
        const lines = text.split('\n').map((line: string) => line.trim());
        const result = {
            name: '',
            phone: '',
            email: '',
            designation: '',
        };
      
        const phoneRegex = /^\+?[0-9]{1,4}[-\s]?[0-9]{3,5}[-\s]?[0-9]{5,10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        lines.forEach(line => {
            if (emailRegex.test(line)) {
                result.email = line;
            } else if (phoneRegex.test(line)) {
                result.phone = line;
            } else if (isDesignation(line)) {
                result.designation = line;
            } else if (!result.name) {
                result.name = line;  // Assume the first unmatched line is the name
            }
        });
        console.log("Results: ", result)
        return result;
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




/*






Product Manager
Akash
+91 75500 47716
example.@gmail.com

*/