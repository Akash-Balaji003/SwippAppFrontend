import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Define the return type for reverseGeocode
interface LocationData {
  latitude: number;
  longitude: number;
  placeName: string;
}

// Request location permission and fetch coordinates
export const getLocation = async (): Promise<LocationData> => {
  const permission = await request(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  );

  if (permission !== RESULTS.GRANTED) {
    throw new Error('Location permission denied');
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          const placeName = await reverseGeocode(latitude, longitude);
          resolve({ latitude, longitude, placeName });
        } catch (error) {
          reject(error);
        }
      },
      error => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

// Convert latitude & longitude into a human-readable place name
const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    console.log("address: ", data.address )

    console.log("county: ", data.address.county )

    if (data && data.address) {
      return data.address.county || data.address.city || data.address.town || data.address.village || 'Unknown Location';
    }
    return 'Unknown Location';
  } catch (error) {
    throw new Error('Reverse Geocoding Error: ' + error);
  }
};
