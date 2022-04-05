import React from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import {ImagePickerResponse, launchCamera} from 'react-native-image-picker';

interface ProfileImageUploaderProps {
  image: string;
  setImage: (uri: string) => void;
}

const hasCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      console.log('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

const ProfileImageUploader = ({image, setImage}: ProfileImageUploaderProps) => {
  const getPhoto = async () => {
    if (Platform.OS === 'android' && !(await hasCameraPermission())) {
      return;
    } else {
      launchCamera(
        {mediaType: 'photo', cameraType: 'back'},
        (response: ImagePickerResponse) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if (response.uri) {
            setImage(response.uri);
          }
        }
      );
    }
  };

  return (
    <Pressable style={[styles.image, styles.container]} onPress={getPhoto}>
      <Image
        style={styles.image}
        source={
          image ? {uri: image} : require('../../assets/profile_placehoder.png')
        }
      />
    </Pressable>
  );
};

export default ProfileImageUploader;

const styles = StyleSheet.create({
  container: {alignSelf: 'center'},
  image: {width: 80, height: 80, borderRadius: 50},
});
