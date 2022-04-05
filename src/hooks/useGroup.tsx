import {useCallback, useEffect, useState} from 'react';
import {saveGroup} from '../redux/modules/group';
import {Employee} from '../types/types';
import {GROUP_MEMBERS_MAX_NUMBER} from '../utis/constants';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useGroup = () => {
  const dispatch = useAppDispatch();

  const employeeList = useAppSelector(state => state.employee.employeeList);
  const selectedIds = useAppSelector(state => state.group.selectedIds);
  const selectedEmployees = useAppSelector(
    state => state.group.selectedEmployees
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [employeesInGroup, setEmployeesInGrop] = useState(
    selectedIds?.map(id => selectedEmployees[id])
  );

  const checkForErrorMessage = useCallback(
    (selectedCount: number) => {
      if (selectedIds.length === 0) {
        setErrorMessage('Min 1 employee');
      } else if (selectedCount > GROUP_MEMBERS_MAX_NUMBER) {
        setErrorMessage(`Up to ${GROUP_MEMBERS_MAX_NUMBER} employee`);
      } else {
        setErrorMessage('');
      }
    },
    [selectedIds.length]
  );

  useEffect(() => {
    setEmployee(selectedIds?.map(id => selectedEmployees[id]));
    checkForErrorMessage(selectedIds.length);
  }, [selectedIds, selectedEmployees, checkForErrorMessage]);

  const setEmployee = (list: Employee[]) => {
    setEmployeesInGrop(list);
  };

  const save = () => {
    if (
      selectedIds.length > 0 &&
      selectedIds.length <= GROUP_MEMBERS_MAX_NUMBER
    ) {
      const obj: {[key: string]: Employee} = Object.assign(
        {},
        ...employeesInGroup.map(item => ({[item.id]: item}))
      );

      dispatch(
        saveGroup({
          employees: obj,
          ids: employeesInGroup.map(employee => employee.id),
        })
      );
    }
  };

  return {employeeList, employeesInGroup, errorMessage, setEmployee, save};
};

export default useGroup;
