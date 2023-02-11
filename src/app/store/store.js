import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../../app/store/features/auth/authSlice'
import patientReducer from '../../app/store/features/patients/patientSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        patient: patientReducer
    },
})
