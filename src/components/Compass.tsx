import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {magnetometer} from 'react-native-sensors';
import Svg, {Circle, Line} from 'react-native-svg';

interface CompassProps {
  qiblaDirection: number;
}

interface MagnetometerData {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

const Compass: React.FC<CompassProps> = ({qiblaDirection}) => {
  const [magnetometerData, setMagnetometerData] =
    useState<MagnetometerData | null>(null);
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

    const subscription = magnetometer.subscribe(
      (data: MagnetometerData) => {
        setMagnetometerData(data);
        console.log('Magnetometer data:', data); // Verileri kontrol etmek için konsola yazdırın
      },
      (_error: any) => {
        console.log('The sensor is not available on this device.');
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const calculateAzimuth = (data: MagnetometerData | null) => {
    if (data) {
      let {x, y} = data;
      let azimuth = Math.atan2(y, x) * (180 / Math.PI);
      return (azimuth + 360) % 360;
    }
    return 0;
  };

  const degree = calculateAzimuth(magnetometerData);
  const qiblaAngle = (degree - qiblaDirection + 360) % 360;

  return (
    <View style={styles.container}>
      {permissionGranted ? (
        <View style={styles.compassContainer}>
          <Svg height="300" width="300" viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="black"
              strokeWidth="2.5"
              fill="none"
            />

            <Line
              x1="50"
              y1="50"
              x2={50 + 35 * Math.cos((qiblaAngle * Math.PI) / 180)}
              y2={50 + 35 * Math.sin((qiblaAngle * Math.PI) / 180)}
              stroke="red"
              strokeWidth="2.5"
            />
          </Svg>
          <Text style={styles.degreeText}>{`Kıble Açısı: ${Math.round(
            qiblaAngle,
          )}°`}</Text>
        </View>
      ) : (
        <Text>İzin verilmedi.</Text>
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
  compassContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  degreeText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default Compass;
