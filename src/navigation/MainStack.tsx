import React from 'react';
import MyGroupScren from '../screens/myGroup/MyGroupScreen';
import EmployeeProfileScreen from '../screens/userProfile/EmployeeProfileScreen';
import {ScreenNames} from './screenNames';
import {EmployeeStack} from './Stacks';

const MainStack = () => {
  return (
    <EmployeeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.EmployeeProfile}>
      <EmployeeStack.Screen
        name={ScreenNames.EmployeeProfile}
        component={EmployeeProfileScreen}
      />
      <EmployeeStack.Screen
        name={ScreenNames.MyGroup}
        component={MyGroupScren}
      />
    </EmployeeStack.Navigator>
  );
};
export default MainStack;
