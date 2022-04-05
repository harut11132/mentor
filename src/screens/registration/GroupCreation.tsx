import React from 'react';
import {View} from 'react-native';
import StepperControlButtons from '../../components/StepperControlButtons';
import useAppDispatch from '../../hooks/useAppDispatch';
import {setIsAuthenticated} from '../../redux/modules/auth';
import WizardContentWrapper from './WizardContentWraper';
import useGroup from '../../hooks/useGroup';
import MyGroup from '../../components/MyGroup';

interface GroupCreationProps {
  goBack: () => void;
}

const GroupCreation = ({goBack}: GroupCreationProps) => {
  const dispatch = useAppDispatch();
  const {employeeList, employeesInGroup, errorMessage, setEmployee, save} =
    useGroup();

  const finishRegistration = () => {
    save();
    if (employeesInGroup.length > 0) {
      dispatch(setIsAuthenticated(true));
    }
  };

  return (
    <WizardContentWrapper title="Your Group">
      <View>
        <MyGroup
          employeeList={employeeList}
          employeesInGroup={employeesInGroup}
          setEmployee={setEmployee}
        />
        <StepperControlButtons
          disabledRightButton={!!errorMessage}
          rightButtonText={errorMessage || 'Go Next'}
          onRightButton={finishRegistration}
          onLeftButton={goBack}
        />
      </View>
    </WizardContentWrapper>
  );
};

export default GroupCreation;
