import React from 'react';
import Registration from '../screens/registration/RegistrationScreen';
import {ScreenNames} from './screenNames';
import {EmployeeStack} from './Stacks';

const AuthStack = () => {
  return (
    <EmployeeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <EmployeeStack.Screen
        name={ScreenNames.Registration}
        component={Registration}
      />
    </EmployeeStack.Navigator>
  );
};

export default AuthStack;
