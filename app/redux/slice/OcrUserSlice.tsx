import { createSlice } from '@reduxjs/toolkit';

const ocrUsrSlice = createSlice({
  name: 'ocrUser',
  initialState: {
    userList: [],
    rejectLeadList: [],
  },
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setRejectLeadList: (state, action) => {
      state.rejectLeadList = action.payload;
    },
  },
});

export const { setUserList, setRejectLeadList } = ocrUsrSlice.actions;
export default ocrUsrSlice.reducer;
