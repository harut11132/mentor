import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, Button, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyGroup from '../../components/MyGroup';
import useGroup from '../../hooks/useGroup';
import {EmployeeNavigationProp} from '../../navigation/types';

const MyGroupScren = () => {
  const navigation = useNavigation<EmployeeNavigationProp>();
  const {employeeList, employeesInGroup, errorMessage, setEmployee, save} =
    useGroup();

  return (
    <SafeAreaView style={styles.root}>
      <Text onPress={navigation.goBack}>Back to profile</Text>
      <Text style={styles.title}>My Group</Text>
      <MyGroup
        employeeList={employeeList}
        employeesInGroup={employeesInGroup}
        setEmployee={setEmployee}
      />
      <Button
        title={errorMessage ? errorMessage : 'Save'}
        disabled={!!errorMessage}
        onPress={save}
      />
    </SafeAreaView>
  );
};

export default MyGroupScren;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  employeeListContainer: {maxHeight: 300},
});
