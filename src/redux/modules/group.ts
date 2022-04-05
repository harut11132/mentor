import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import storage from '../../services/storage.service';
import {Employee} from '../../types/types';
import {RootState} from '../store';
import {setIsAuthenticated, signOut} from './auth';

interface GroupState {
  isLoadingGroup: boolean;
  isSaveingGroup: boolean;
  selectedIds: number[];
  selectedEmployees: {[key: string]: Employee};
}

const initialState: GroupState = {
  isSaveingGroup: false,
  isLoadingGroup: false,
  selectedIds: [],
  selectedEmployees: {},
};

export const saveGroup = createAsyncThunk(
  'group/saveGroup',
  async (arg: {employees: {[key: string]: Employee}; ids: number[]}) => {
    await storage.save({key: 'mentor1', data: arg});
    return arg;
  }
);

export const getGroup = createAsyncThunk<
  {employees: {[key: string]: Employee}; ids: number[]},
  void,
  {state: RootState}
>('group/getGroup', async (_, thunkAPI) => {
  const result = await storage.load<{
    employees: {[key: string]: Employee};
    ids: number[];
  }>({
    key: 'mentor1',
  });
  if (result) {
    thunkAPI.dispatch(setIsAuthenticated(true));
  }
  return result;
});

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setSelectedEmployees: (
      state,
      action: PayloadAction<{id: number; employee?: Employee}>
    ) => {
      const {id, employee} = action.payload;
      if (!employee) {
        const index = state.selectedIds.indexOf(id);
        if (index > -1) {
          state.selectedIds.splice(index, 1);
        }
        delete state.selectedEmployees[id];
      } else {
        state.selectedEmployees[id] = employee;
        state.selectedIds.push(id);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveGroup.pending, state => {
        state.isSaveingGroup = true;
      })
      .addCase(saveGroup.fulfilled, (state, action) => {
        state.isSaveingGroup = false;
        state.selectedEmployees = action.payload.employees;
        state.selectedIds = action.payload.ids;
      })
      .addCase(saveGroup.rejected, state => {
        state.isSaveingGroup = false;
      })
      .addCase(getGroup.pending, state => {
        state.isLoadingGroup = true;
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.isLoadingGroup = false;
        state.selectedEmployees = action.payload.employees;
        state.selectedIds = action.payload.ids;
      })
      .addCase(getGroup.rejected, state => {
        state.isLoadingGroup = false;
      })
      .addCase(signOut.fulfilled, () => initialState);
  },
});

export const {setSelectedEmployees} = groupSlice.actions;

export default groupSlice.reducer;
