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
    recentMainVitals: {
        allvitals: [],
    },
    bpItems: { items: [] },
    bsItems: { items: [] },
    faItems: { items: [] },
    elistItems: { items: [] },
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
    mainVitalSummary: {
        BeforeBF: 0,
        BeforeLunch: 0,
        BeforeDinner: 0,
        BeforeBedtime: 0,
        beforeBF_Percent: 0,
        beforeLunch_Percent: 0,
        beforeDinner_Percent: 0,
        beforeBedtime_Percent: 0,
    },
    mainMonthlyVitalSummary: {
        stats: [],
    },
    dashboardReports: {
        Patients: 0,
        BloodReports: 0,
        FitnessReports: 0,
        EmergencyList: 0,
    },
    dashboardPieReports: {
        reports: [],
        BloodPReports: 0,
        BloodSReports: 0,
        FitnessReports: 0,
        overallTotal: 0,
    },
    dashboardBarReports: {
        reports: [],
        CurrentTotal: 0,
        PatientPercent: 0,
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
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
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
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
            ) {
                authService.logout()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
        }
    }
)

// create Refill
export const CreateRefill = createAsyncThunk(
    'patient/prescription/refills/creates/',
    async (details, thunkAPI) => {
        const creationAttempt = await patientService.createRefill(details)

        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
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
    '/patient/getall',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getAllPatients()

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

/** General vitals  */

export const GetAllBPVitals = createAsyncThunk(
    'patients/bp/vitals/getall',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getAllBPVitals()

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

export const GetAllBSVitals = createAsyncThunk(
    'patients/bs/vitals/getall',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getAllBSVitals()

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

export const GetAllFAVitals = createAsyncThunk(
    'patients/fa/vitals/getall',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getAllFAVitals()

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

export const GetAllEListVitals = createAsyncThunk(
    'patients/elist/vitals/getall',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getAllElistVitals()

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

/** main vitals collection links */
//recent vitals
export const GetMainRecentVitals = createAsyncThunk(
    'patients/main/vitals/getall',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getMainRecentVitals()

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

//main summary vitals
export const GetMainSummaryVitals = createAsyncThunk(
    'patients/main/summary/vitals',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getMainSummaryVitals()

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

//main monthly vitals summary
export const GetMainMonthlySummaryVitals = createAsyncThunk(
    'patients/main/monthly/summary/vitals',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getMainMonthlySummaryVitals(
            details
        )

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

/** dashboard main */
/** dashboard reports */
export const GetdashboardReports = createAsyncThunk(
    'patients/dashboard/reports/summary',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getMainDashboardReports()

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

/** dashboard pie graph reports */
export const GetdashboardPieGraph = createAsyncThunk(
    'patients/dashboard/graph/pie',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getMaindashboardPieGraph(
            details
        )

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

/** dashboard bar graph reports */
export const GetdashboardBarGraph = createAsyncThunk(
    'patients/dashboard/graph/bars',
    async (details, thunkAPI) => {
        const getAttempt = await patientService.getMaindashboardBarGraph(
            details
        )

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

            /** create refill */
            .addCase(CreateRefill.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(CreateRefill.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(CreateRefill.rejected, (state, action) => {
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

            /** get all BP Vitals */
            .addCase(GetAllBPVitals.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetAllBPVitals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bpItems = action.payload
            })
            .addCase(GetAllBPVitals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** get all BS Vitals */
            .addCase(GetAllBSVitals.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetAllBSVitals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bsItems = action.payload
            })
            .addCase(GetAllBSVitals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** get all Fa vitals */
            .addCase(GetAllFAVitals.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetAllFAVitals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.faItems = action.payload
            })
            .addCase(GetAllFAVitals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** get all Elists */
            .addCase(GetAllEListVitals.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetAllEListVitals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.elistItems = action.payload
            })
            .addCase(GetAllEListVitals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** main vitals collections link */
            /** get recent main vitals */
            .addCase(GetMainRecentVitals.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetMainRecentVitals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.recentMainVitals = action.payload
            })
            .addCase(GetMainRecentVitals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** get main summary vitals */
            .addCase(GetMainSummaryVitals.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetMainSummaryVitals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.mainVitalSummary = action.payload
            })
            .addCase(GetMainSummaryVitals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** get montlhy main summary vitals */
            .addCase(GetMainMonthlySummaryVitals.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetMainMonthlySummaryVitals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.mainMonthlyVitalSummary = action.payload
            })
            .addCase(GetMainMonthlySummaryVitals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** get  main dashbord summary  */
            .addCase(GetdashboardReports.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetdashboardReports.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dashboardReports = action.payload
            })
            .addCase(GetdashboardReports.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** get dashbord pie data  */
            .addCase(GetdashboardPieGraph.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetdashboardPieGraph.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dashboardPieReports = action.payload
            })
            .addCase(GetdashboardPieGraph.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** get dashbord bar data  */
            .addCase(GetdashboardBarGraph.pending, (state) => {
                state.isLoading = true
                state.message = ''
            })
            .addCase(GetdashboardBarGraph.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dashboardBarReports = action.payload
            })
            .addCase(GetdashboardBarGraph.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = patientSlice.actions
export default patientSlice.reducer
