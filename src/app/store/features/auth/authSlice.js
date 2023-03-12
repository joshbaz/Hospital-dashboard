import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import Cookies from 'js-cookie'

let isAuthenticated = !!Cookies.get('_tk')
const user = isAuthenticated ? JSON.parse(Cookies.get('user')) : null

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    userdetails: null,
}

export const Login = createAsyncThunk(
    'auth/login',
    async (userDetails, thunkAPI) => {
        const LoginAttempt = await authService.Login(userDetails)

        if (LoginAttempt.type === 'success') {
            return LoginAttempt
        } else {
            return thunkAPI.rejectWithValue(LoginAttempt.message)
        }
    }
)

export const Logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const GetUserDetails = createAsyncThunk(
    'auth/details',
    async (userDetails, thunkAPI) => {
        const getAttempt = await authService.getAllDetails(userDetails)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated' ||
                getAttempt.message === 'jwt malformed'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

//update details
export const UpdateDetails = createAsyncThunk(
    'auth/update/details',
    async (userDetails, thunkAPI) => {
        const getAttempt = await authService.updateDetails(userDetails)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated' ||
                getAttempt.message === 'jwt malformed'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

//update settings
export const UpdateSettings = createAsyncThunk(
    'auth/update/settings',
    async (userDetails, thunkAPI) => {
        const getAttempt = await authService.updateSettings(userDetails)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated' ||
                getAttempt.message === 'jwt malformed'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

//update passkey
export const UpdatePasskey = createAsyncThunk(
    'auth/update/passkey',
    async (userDetails, thunkAPI) => {
        const getAttempt = await authService.updatePasskey(userDetails)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated' ||
                getAttempt.message === 'jwt malformed'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

/** resets passwords */
//forgot password
export const ForgotPasskeys = createAsyncThunk(
    'auth/passwords/forgotpassword',
    async (userDetails, thunkAPI) => {
        const getAttempt = await authService.forgotPasskey(userDetails)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated' ||
                getAttempt.message === 'jwt malformed'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

//verify passkey Reset
export const VerifyPasskeyReset = createAsyncThunk(
    'auth/passwords/verifyReset',
    async (userDetails, thunkAPI) => {
        const getAttempt = await authService.verifyPasskeyReset(userDetails)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated' ||
                getAttempt.message === 'jwt malformed'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

//verify passkey Reset
export const ResetPassword = createAsyncThunk(
    'auth/passwords/resetpassword',
    async (userDetails, thunkAPI) => {
        const getAttempt = await authService.resetPassword(userDetails)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated' ||
                getAttempt.message === 'jwt malformed'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

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
            /** get all details */
            .addCase(GetUserDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(GetUserDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userdetails = action.payload
            })
            .addCase(GetUserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** update details */
            .addCase(UpdateDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(UpdateDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(UpdateDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** update settings */
            .addCase(UpdateSettings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(UpdateSettings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(UpdateSettings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** update passkey */
            .addCase(UpdatePasskey.pending, (state) => {
                state.isLoading = true
            })
            .addCase(UpdatePasskey.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(UpdatePasskey.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** resets passwords */
            /** forgot password */
            .addCase(ForgotPasskeys.pending, (state) => {
                state.isLoading = true
            })
            .addCase(ForgotPasskeys.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(ForgotPasskeys.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** verify passkey Reset */
            .addCase(VerifyPasskeyReset.pending, (state) => {
                state.isLoading = true
            })
            .addCase(VerifyPasskeyReset.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(VerifyPasskeyReset.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** verify passkey Reset */
            .addCase(ResetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(ResetPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(ResetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
