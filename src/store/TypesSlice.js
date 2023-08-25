import { createSlice } from "@reduxjs/toolkit";

const initialSlice = {
  choosenTypes: {},
};

export const typesSlice = createSlice({
  name: "types",
  initialState: initialSlice,
  reducers: {
    addTypesInfo: (state, action) => {
      const data = action.payload;
      state.choosenTypes = data;
    },
  },
});

export const { addTypesInfo } = typesSlice.actions;
export default typesSlice.reducer;
