import {createSlice} from '@reduxjs/toolkit';

const SelectorSlice = createSlice({
  name: 'selector',
  initialState: [],
  reducers: {
    selectorState(state, action) {
      state.push({type: action.payload});
    },
  },
});
export const {selectorState} = SelectorSlice.actions;
export default SelectorSlice.reducer;
