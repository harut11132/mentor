import {createSlice} from '@reduxjs/toolkit';
import {Employee, EmploymentInfo, PersonalInfo} from '../../types/types';
import {signOut} from './auth';

interface EmployeeState {
  employeeList: Employee[];
  personalInfo: PersonalInfo;
  employmentInfo: EmploymentInfo;
}

const initialState: EmployeeState = {
  employeeList: [
    {
      id: 1,
      fullName: 'Marigold	Sealey',
      department: 'Marketing',
      jobTitle: 'Analog Circuit Design manager',
      location: '	China	Damaying',
    },
    {
      id: 2,
      fullName: 'Lanita	Yves',
      department: 'Support',
      jobTitle: 'Web Designer II',
      location: 'Japan	Hirakata',
    },
    {
      id: 3,
      fullName: 'Donny	Mannakee',
      department: 'Human Resources',
      jobTitle: 'Health Coach II',
      location: 'Armenia	Sevan',
    },
    {
      id: 4,
      fullName: 'Dodi	Flecknell',
      department: 'Product Management',
      jobTitle: 'Senior Editor',
      location: 'Norway	Drammen',
    },
    {
      id: 5,
      fullName: 'Marci	Clink',
      department: 'Human Resources',
      jobTitle: 'Nuclear Power Engineer',
      location: 'Russia	Nytva',
    },
    {
      id: 6,
      fullName: 'Harv	Cowitz',
      department: 'Services',
      jobTitle: 'Account Coordinator',
      location: 'Uganda	Entebbe',
    },
    {
      id: 7,
      fullName: 'Fonz	Timmermann',
      department: 'Legal',
      jobTitle: 'Geological Engineer',
      location: 'Russia	Cherkasskoye',
    },
    {
      id: 8,
      fullName: 'Hastie	Loughton',
      department: 'Product Management',
      jobTitle: 'Recruiting Manager',
      location: 'China	Jinzhuang',
    },
    {
      id: 9,
      fullName: 'Deck	Gooday',
      department: 'Legal',
      jobTitle: 'Speech Pathologist',
      location: 'Egypt	Isnā',
    },
  ],
  personalInfo: {image: '', fullName: '', location: ''},
  employmentInfo: {department: '', jobTitle: ''},
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setEmploymentInfo: (state, action) => {
      state.employmentInfo = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signOut.fulfilled, () => initialState);
  },
});

export const {setPersonalInfo, setEmploymentInfo} = employeeSlice.actions;

export default employeeSlice.reducer;
