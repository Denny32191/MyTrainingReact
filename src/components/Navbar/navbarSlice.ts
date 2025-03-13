import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ActiveButtonType =
  | "Все"
  | "Designers"
  | "Analysts"
  | "Managers"
  | "iOS"
  | "Android";
  export interface NavbarState {
    activeButton: ActiveButtonType;
  }
const initialState: NavbarState = {
  activeButton:  "Все",
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<ActiveButtonType>) => {
      state.activeButton = action.payload;
    },
  },
});

export const { setActiveButton } = navbarSlice.actions;
export const navbarReducer = navbarSlice.reducer;