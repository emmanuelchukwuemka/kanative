import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userType: '',
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUserDetail: (state, action) => {
      console.log('Payload Data :: ', action.payload);
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      (state.user = {}), (state.userType = '');
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserType, setUserDetail, logoutUser} = authSlice.actions;
export default authSlice.reducer;
