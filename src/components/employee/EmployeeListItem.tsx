import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Employee} from '../../types/types';
import CheckBox from '@react-native-community/checkbox';

interface EmployeeListitemProps {
  employee: Employee;
  isChecked: boolean;
  onRowSelection: (id: number, checked?: Employee) => void;
}

const EmployeeListItem = ({
  employee,
  isChecked,
  onRowSelection,
}: EmployeeListitemProps) => {
  const {id, fullName, department} = employee;
  return (
    <View style={styles.root}>
      <View>
        <Text>{fullName}</Text>
        <Text>{department}</Text>
      </View>
      <CheckBox
        disabled={false}
        value={isChecked}
        onValueChange={(newValue: boolean) =>
          onRowSelection(id, newValue ? employee : undefined)
        }
      />
    </View>
  );
};

export default EmployeeListItem;

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'green',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
