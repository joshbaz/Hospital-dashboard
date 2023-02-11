import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import Cookies from 'js-cookie'

let isAuthenticated = !!Cookies.get('_tk')
const user = isAuthenticated ? JSON.parse(Cookies.get('user')) : null
console.log('users', user)
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const Login = createAsyncThunk(
    'auth/login',
    async (userDetails, thunkAPI) => {
        const LoginAttempt = await authService.Login(userDetails)

        if (LoginAttempt.type === 'success') {
            return LoginAttempt
        } else {
            console.log('error message', LoginAttempt.message)
            return thunkAPI.rejectWithValue(LoginAttempt.message)
        }
    }
)

export const Logout = createAsyncThunk('auth/logout', async () => {
    authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(Login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(Logout.fulfilled, (state) => {
                state.user = null
                state.isSuccess = false
                state.message = 'logout success'
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
