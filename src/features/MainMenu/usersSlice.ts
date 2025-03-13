import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Асинхронный thunk для получения пользователей
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            // Искусственная задержка в 2 секунды
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await axios.get(
                "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all"
            );
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message); // Приводим error к типу Error
        }
    }
);

// Типы
export type User = {
    id: string; // id теперь строка
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
    filter: "alphabet" | "birthday" | null;
    loading: boolean;
    error: string | null;
    searchQuery: string;
};

const initialState: UsersState = {
    users: [],
    filter: null,
    loading: false,
    error: null,
    searchQuery: "",
};

// Создание slice
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAddUsers: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        setFilter: (state,action: PayloadAction<"alphabet" | "birthday" | null>) => {
            state.filter = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
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
                state.users = action.payload.items; // Извлеките массив users
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Экспорт actions и reducer
export const { setAddUsers,setFilter,setSearchQuery } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
