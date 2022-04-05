import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import storage from '../../services/storage.service';

interface AuthState {
  isAuthenticated: boolean;
  isSigningOut: boolean;
}

const initialState: AuthState = {isAuthenticated: false, isSigningOut: false};

export const signOut = createAsyncThunk('auth/signOut', async () => {
  storage.remove({key: 'mentor1'});
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signOut.pending, state => {
        state.isSigningOut = true;
      })
      .addCase(signOut.fulfilled, state => {
        state.isSigningOut = false;
        state.isAuthenticated = false;
      })
      .addCase(signOut.rejected, state => {
        state.isSigningOut = false;
      });
  },
});

export const {setIsAuthenticated} = authSlice.actions;

export default authSlice.reducer;
