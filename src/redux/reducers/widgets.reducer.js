import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  widgetsDiv: false,
};
export const widgetsSlice = createSlice({
  name: "widgets",
  initialState: initialState,
  reducers: {
    setWidgets: (state, action) => {
      //state.data = action.payload;
      state.widgetsDiv = !state.widgetsDiv;
    },
  },
});

export const { setWidgets } = widgetsSlice.actions;
export const widgetsReducer = widgetsSlice.reducer;