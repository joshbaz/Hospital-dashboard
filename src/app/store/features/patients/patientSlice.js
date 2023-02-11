import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../auth/authService'
import patientService from './patientService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    allItems: {
        items: [],
    },
    individualVitalSummary: {
        BeforeBF: 0,
        BeforeLunch: 0,
        BeforeDinner: 0,
        BeforeBedtime: 0,
        beforeBF_Percent: 0,
        beforeLunch_Percent: 0,
        beforeDinner_Percent: 0,
        beforeBedtime_Percent: 0,
    },
    individualPrescriptionSummary: {
        ActivePrescription: 0,
        RefillRequests: 0,
        activePrescription_Percent: 0,
        refillRequests_Percent: 0,
    },
    individualPatient: {
        patient: null,
        vitals: [],
        prescription: [],
    },
}

// creation action
export const CreatePatient = createAsyncThunk(
    'patient/create',
    async (details, thunkAPI) => {
        const creationAttempt = await patientService.patientCreate(details)

        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
        }
    }
)

// prescription creation action
export const CreatePrescription = createAsyncThunk(
    'patient/prescription/create',
    async (details, thunkAPI) => {
        const creationAttempt = await patientService.createPrescription(details)

        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
        }
    }
)

// prescription edit action
export const EditPrescription = createAsyncThunk(
    'patient/prescription/update',
    async (details, thunkAPI) => {
        const creationAttempt = await patientService.editPrescription(details)

        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
        }
    }
)

export const GetAllPatients = createAsyncThunk(
    'patient/getall',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getAllPatients()

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

// get general vitals summary
export const GetIndividualVitalSummary = createAsyncThunk(
    'patient/individual/vitalsummary',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getIndividualVitalSummary(
            details
        )

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

// get prescription summary
export const GetIndividualPrescriptionSummary = createAsyncThunk(
    'patient/individual/prescriptionsummary',
    async (details, thunkAPI) => {
        const getAttempt =
            await patientService.getIndividualPrescriptionSummary(details)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

// get individual patient
export const GetIndividualPatient = createAsyncThunk(
    'patient/individualpatient',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getIndividualPatient(details)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
        }
    }
)

/** create slice */
export const patientSlice = createSlice({
    name: 'patient',
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
            .addCase(CreatePatient.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(CreatePatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(CreatePatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** create prescription */
            .addCase(CreatePrescription.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(CreatePrescription.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(CreatePrescription.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** edit prescription */
            .addCase(EditPrescription.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(EditPrescription.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(EditPrescription.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** get all patients */
            .addCase(GetAllPatients.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetAllPatients.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allItems = action.payload
            })
            .addCase(GetAllPatients.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** get individual vital summary */
            .addCase(GetIndividualVitalSummary.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetIndividualVitalSummary.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualVitalSummary = action.payload
            })
            .addCase(GetIndividualVitalSummary.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** get individual prescription summary */
            .addCase(GetIndividualPrescriptionSummary.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(
                GetIndividualPrescriptionSummary.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.individualPrescriptionSummary = action.payload
                }
            )
            .addCase(
                GetIndividualPrescriptionSummary.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                }
            )

            /** get individual patient */
            .addCase(GetIndividualPatient.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetIndividualPatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualPatient = action.payload
            })
            .addCase(GetIndividualPatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = patientSlice.actions
export default patientSlice.reducer
