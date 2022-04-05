import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {Employee} from '../types/types';

interface SelectedEmployeesProps {
  employees: Employee[];
  setEmployee: (list: Employee[]) => void;
}

const SelectedEmployees = ({
  employees,
  setEmployee,
}: SelectedEmployeesProps) => {
  const renderItem = ({item, drag, isActive}: RenderItemParams<Employee>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            isActive
              ? styles.activeBackgroundColor
              : styles.inactiveBackgroundColor,
          ]}>
          <Text style={styles.text}>{item.fullName}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      style={styles.container}
      data={employees}
      onDragEnd={({data}) => setEmployee(data)}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default SelectedEmployees;

const styles = StyleSheet.create({
  rowItem: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {height: 200, backgroundColor: '#D3D3D3', padding: 10},
  activeBackgroundColor: {backgroundColor: '#fc0'},
  inactiveBackgroundColor: {backgroundColor: '#add8e6'},
});
