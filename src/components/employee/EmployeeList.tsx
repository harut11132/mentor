import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {useDispatch} from 'react-redux';
import useAppSelector from '../../hooks/useAppSelector';
import {setSelectedEmployees} from '../../redux/modules/group';
import {Employee} from '../../types/types';
import EmployeeListItem from './EmployeeListItem';

interface EmployeeListProps {
  list: Employee[];
}

const EmployeeList = ({list}: EmployeeListProps) => {
  const dispatch = useDispatch();

  const selectedEmployees = useAppSelector(
    state => state.group.selectedEmployees
  );

  const onRowSelection = useCallback(
    (id: number, checked?: Employee) => {
      dispatch(setSelectedEmployees({id, employee: checked}));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    ({item}: {item: Employee}) => {
      const isChecked = (item && selectedEmployees[item.id]) || false;
      if (!item) {
        return <View />;
      }
      return (
        <EmployeeListItem
          employee={item}
          onRowSelection={onRowSelection}
          isChecked={!!isChecked}
        />
      );
    },
    [onRowSelection, selectedEmployees]
  );
  return <FlatList data={list} renderItem={renderItem} />;
};

export default EmployeeList;
