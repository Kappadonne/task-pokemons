import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./detailsSlice";
import typeReducer from "./TypesSlice";
export const store = configureStore({
  reducer: {
    details: detailsReducer,
    types: typeReducer,
  },
});
