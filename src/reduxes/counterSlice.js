import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  stringValue: '',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setStringValue: (state, action) => {
      state.stringValue = action.payload;
    },
  },
});

export const {setStringValue} = counterSlice.actions;
export default counterSlice.reducer;
