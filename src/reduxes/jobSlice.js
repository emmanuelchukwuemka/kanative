// Redux slice file (jobSlice.js)
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  jobInfo: null, // Change to null if uninitialized
  user: {}, // Assuming user state
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobCreationData: (state, action) => {
      state.jobInfo = {...action.payload};
    },
  },
});

export const {setJobCreationData} = jobSlice.actions;
export default jobSlice.reducer;
