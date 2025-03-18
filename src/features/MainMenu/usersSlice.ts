import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      const response = await axios.get(
        'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all'
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Типы
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  userTag: string;
  department: string;
  position: string;
  birthday?: string;
  phone?: string;
};

export type UsersState = {
  users: User[];
  filteredUsers: User[];
  filter: 'alphabet' | 'birthday' | null;
  loading: boolean;
  error: string | null;
  inputValue: string; 
  searchQuery: string; 
};

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  filter: null,
  loading: false,
  error: null,
  inputValue: '', 
  searchQuery: '', 
};

// Создание slice
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload; 
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload; 

      state.filteredUsers = state.users.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
    },
    setFilter: (state,action: PayloadAction<"alphabet" | "birthday" | null>) => {
        state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.items;
        state.filteredUsers = action.payload.items; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспорт actions и reducer
export const { setInputValue, setSearchQuery,setFilter } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
