import { createSlice } from "@reduxjs/toolkit";

const alert = createSlice({
  name: "alert",
  initialState: {},
  reducers: {
    setAlert: (_state, { payload }) => payload,
    clearAlert: (_state) => ({}),
  },
});

export default alert;
