import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axiosInstance } from './../configs/axios';

export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (payload: any) => {
        const { data } = await axiosInstance.post('users/login', payload);
        return data;
    }
)

export const signupUser = createAsyncThunk(
    "users/signupUser",
    async (payload: any) => {
        const { data } = await axiosInstance.post('users/signup', payload);
        return data;
    }
)

export const getUserByToken = createAsyncThunk(
    "users/getUserByToken",
    async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token || token.length === 0) return null

            const { data } = await axiosInstance.post('users/token', {
                token
            });

            return data;
        } catch (error) {
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        loading: false, // para la carga del boton
        errors: [],
        loadingGetData: false, // para saber si ya hay data del usuario
    },
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem('token');
        },
        refresh(state, action) {
            state.loadingGetData = action.payload;
        }
    },
    extraReducers: {
        // Ingreso a la aplicacion
        [loginUser.fulfilled]: (state: any, action: any) => {
            const { user, token } = action.payload;

            state.user = user
            state.loading = false;
            localStorage.setItem('token', token);
        },
        [loginUser.pending]: (state: any) => {
            state.loading = true;
        },
        [loginUser.rejected]: (state: any) => {
            localStorage.removeItem('token');
            state.user = null;
            state.loading = false;
        },

        // Registro de nuevo usuario
        [signupUser.fulfilled]: (state: any) => {
            state.loading = false;
        },
        [signupUser.pending]: (state: any) => {
            state.loading = true;
        },
        [signupUser.rejected]: (state: any) => {
            state.errors = ['El email ya se encuentra en uso']
            state.loading = false;
        },

        // Obtener usuario por token
        [getUserByToken.fulfilled]: (state: any, action: any) => {
            state.loadingGetData = true;
            state.user = action.payload
        },
        [getUserByToken.pending]: (state: any) => {
        },
        [getUserByToken.rejected]: (state: any) => {
            localStorage.removeItem('token');
            state.loadingGetData = true;
            state.user = null;
        },
    }
})

export const { logout, refresh } = usersSlice.actions;

export default usersSlice.reducer