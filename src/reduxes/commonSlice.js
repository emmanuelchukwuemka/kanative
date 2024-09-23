import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const getSkill = {
  isLoading: false,
  errorData: null,
  skillsList: [],
};

const initialState = {
  skills: getSkill,
};

// export const fetchSkills = createAsyncThunk(
//     "common/fetchSkills",
//     async (_, { rejectWithValue }) => {
//         const response = await fetchSkillsList();
//         if (response?.status === 200) {
//             return response?.data?.data;
//         } else {
//             console.log("delete error case", response);
//         }
//         return rejectWithValue(response?.response?.data?.Error);
//     }
// );

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  //   extraReducers: builder => {
  //     builder
  //       .addCase(fetchSkills.pending, state => {
  //         state.skills.isLoading = true;
  //       })
  //       .addCase(fetchSkills.fulfilled, (state, action) => {
  //         state.skills.isLoading = false;
  //         state.skills.skillsList = action.payload;
  //         state.skills.errorData = null;
  //       })
  //       .addCase(fetchSkills.rejected, (state, action) => {
  //         state.skills.isLoading = false;
  //         state.skills.skillsList = [];
  //         state.skills.errorData = action.payload;
  //       });
  //   },
});

// Action creators are generated for each case reducer function
export const {getSkills} = commonSlice.actions;
export default commonSlice.reducer;
