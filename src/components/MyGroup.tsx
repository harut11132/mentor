import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Employee} from '../types/types';
import EmployeeList from './employee/EmployeeList';
import SelectedEmployees from './SelectedEmployees';

interface MyGroupProps {
  employeeList: Employee[];
  employeesInGroup: Employee[];
  setEmployee: (list: Employee[]) => void;
}

const MyGroup = ({
  employeeList,
  employeesInGroup,
  setEmployee,
}: MyGroupProps) => {
  return (
    <>
      <View style={styles.employeeListContainer}>
        <EmployeeList list={employeeList} />
      </View>
      <SelectedEmployees
        employees={employeesInGroup}
        setEmployee={setEmployee}
      />
    </>
  );
};

export default MyGroup;

const styles = StyleSheet.create({
  employeeListContainer: {maxHeight: 300},
});
