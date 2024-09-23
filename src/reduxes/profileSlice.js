import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profileSlice: '',
  staffProfile: '',
};

export const profileSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCompanyProfile: (state, action) => {
      state.profileSlice = action.payload;
    },
    setStaffProfile: (state, action) => {
      state.staffProfile = action.payload;
    },
  },
});

export const {setCompanyProfile, setStaffProfile} = profileSlice.actions;
export default profileSlice.reducer;
