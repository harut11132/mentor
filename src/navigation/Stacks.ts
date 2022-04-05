import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList, EmployeeStackParamList} from './types';

export const EmployeeStack = createNativeStackNavigator<
  AuthStackParamList & EmployeeStackParamList
>();
