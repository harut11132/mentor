import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {Button, PermissionsAndroid, Platform, Text, View} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export type Location = {latitude: string; longitude: string};

interface LocationSetterProps {
  location: string;
  setLocation: (location: Location) => void;
}

const LocationSetter = ({location, setLocation}: LocationSetterProps) => {
  const [isLoadingLocation, setLoadingLocation] = useState(false);

  const hasLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log('Permission Denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const findCoordinates = async () => {
    if (Platform.OS === 'android' && !(await hasLocationPermission())) {
      return;
    } else {
      setLoadingLocation(true);
      Geolocation.getCurrentPosition(
        position => {
          const latitude = JSON.stringify(position.coords.latitude);
          const longitude = JSON.stringify(position.coords.longitude);
          setLocation({latitude, longitude});
          setLoadingLocation(false);
        },
        error => {
          setLoadingLocation(false);
          console.error('Error', JSON.stringify(error));
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }
  };

  const getLocation = async () => {
    try {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      }).then(data => {
        if (data === 'already-enabled' || data === 'enabled') {
          findCoordinates();
        } else {
          setTimeout(() => {
            findCoordinates();
          }, 1000);
        }
      });
    } catch (e) {}
  };

  return (
    <View>
      <Button
        disabled={isLoadingLocation}
        title={isLoadingLocation ? 'Loading Location' : 'Get Location'}
        onPress={getLocation}
      />
      {!!location && (
        <>
          <Text>Current location is:</Text>
          <Text> {location}</Text>
        </>
      )}
    </View>
  );
};

export default LocationSetter;
