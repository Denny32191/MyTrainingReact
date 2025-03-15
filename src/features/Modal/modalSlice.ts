
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = {
  isOpen: boolean;

  // status: "success" | "error" | null;

};
const initialState: ModalState = {
  isOpen: false,

  // status: null,

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