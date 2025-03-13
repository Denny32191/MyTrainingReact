import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { UsersState, usersReducer } from "../features/MainMenu/usersSlice";
import { NavbarState, navbarReducer } from "./../components/Navbar/navbarSlice";
import { ModalState, modalReducer } from "../features/Modal/modalSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    navbar: navbarReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = {
  users: UsersState;
  navbar: NavbarState;
  modal: ModalState;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
