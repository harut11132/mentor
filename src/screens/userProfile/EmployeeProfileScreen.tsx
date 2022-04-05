import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {ScreenNames} from '../../navigation/screenNames';
import {EmployeeNavigationProp} from '../../navigation/types';
import {signOut} from '../../redux/modules/auth';

const EmployeeProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<EmployeeNavigationProp>();
  const isSigningOut = useAppSelector(state => state.auth.isSigningOut);
  const editGroup = () => {
    navigation.navigate(ScreenNames.MyGroup);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.button}>
        <Button title="Edit Group" onPress={editGroup} />
      </View>
      <View style={styles.button}>
        <Button
          title={isSigningOut ? 'Is Signing Out' : 'Sign Out'}
          disabled={isSigningOut}
          onPress={handleSignOut}
        />
      </View>
    </View>
  );
};

export default EmployeeProfileScreen;

const styles = StyleSheet.create({
  root: {paddingHorizontal: 20},
  title: {alignSelf: 'center', marginTop: 10, fontSize: 20, marginBottom: 30},
  button: {marginBottom: 20},
});
