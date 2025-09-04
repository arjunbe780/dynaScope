import { createSlice } from '@reduxjs/toolkit';

const ocrUsrSlice = createSlice({
  name: 'ocrUser',
  initialState: {
    userList: [],
  },
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const { setUserList } = ocrUsrSlice.actions;
export default ocrUsrSlice.reducer;
