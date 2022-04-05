import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {Registration: undefined};

export type EmployeeStackParamList = {
  EmployeeProfile: undefined;
  MyGroup: undefined;
};

export type EmployeeNavigationProp =
  NativeStackNavigationProp<EmployeeStackParamList>;
