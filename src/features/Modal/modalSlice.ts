
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = {
  isOpen: boolean;



};
const initialState: ModalState = {
  isOpen: false,
};
export const modalSlice = createSlice({
  name: " modal",
  initialState,

  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },

  },
});
export const { setIsOpen } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;