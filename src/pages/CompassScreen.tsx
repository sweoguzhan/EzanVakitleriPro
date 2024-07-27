import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Compass from '../components/Compass';

// Kabe'nin koordinatları
const KAABA_LATITUDE = 21.4225;
const KAABA_LONGITUDE = 39.8262;

const QiblaScreen = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setPermissionGranted(true);
      }
    };

    requestPermissions();

    if (permissionGranted) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const direction = calculateQibla(latitude, longitude);
          setQiblaDirection(direction);
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [permissionGranted]);

  const calculateQibla = (latitude: number, longitude: number) => {
    const latK = KAABA_LATITUDE * (Math.PI / 180.0);
    const lonK = KAABA_LONGITUDE * (Math.PI / 180.0);
    const latU = latitude * (Math.PI / 180.0);
    const lonU = longitude * (Math.PI / 180.0);

    const direction =
      Math.atan2(
        Math.sin(lonK - lonU),
        Math.cos(latU) * Math.tan(latK) -
          Math.sin(latU) * Math.cos(lonK - lonU),
      ) *
      (180.0 / Math.PI);

    return (direction + 360.0) % 360.0; // Kıble yönü
  };

  return (
    <View style={styles.container}>
      {qiblaDirection !== null ? (
        <Compass qiblaDirection={qiblaDirection} />
      ) : (
        <Text>Konum alınıyor...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QiblaScreen;
