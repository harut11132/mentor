import {combineReducers} from 'redux';
import auth from './modules/auth';
import employee from './modules/employee';
import group from './modules/group';

export default combineReducers({auth, employee, group});
