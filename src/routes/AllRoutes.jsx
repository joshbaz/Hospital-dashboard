import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPasskey from '../app/Views/AuthViews/ForgotPasskey'
import Login from '../app/Views/AuthViews/Login'
import ResetPasskey from '../app/Views/AuthViews/ResetPasskey'
import VerifyChange from '../app/Views/AuthViews/VerifyChange'
import Account from '../app/Views/ScreenViews/Account'
import EmergencyList from '../app/Views/ScreenViews/EmergencyList'
import HealthVitalsBPressure from '../app/Views/ScreenViews/HealthVitalsBPressure'
import HealthVitalsBSugar from '../app/Views/ScreenViews/HealthVitalsBSugar'
import HealthVitalsFitness from '../app/Views/ScreenViews/HealthVitalsFitness'
import HealthVitalsMain from '../app/Views/ScreenViews/HealthVitalsMain'
import Overview from '../app/Views/ScreenViews/Overview'
import Patients from '../app/Views/ScreenViews/Patients'
import ViewPatient from '../app/Views/ScreenViews/ViewPatient'
import ViewPatientPrescription from '../app/Views/ScreenViews/ViewPatientPrescription'
import ViewPatientVitals from '../app/Views/ScreenViews/ViewPatientVitals'
import ProtectedRoute from './protectedRoutes'

const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/auth/login' element={<Login />} />
                <Route
                    exact
                    path='/auth/forgotPasskey'
                    element={<ForgotPasskey />}
                />

                <Route
                    exact
                    path='/auth/resetToken/:tk'
                    element={<VerifyChange />}
                />
                <Route
                    exact
                    path='/auth/ResetPasskey/:tk'
                    element={<ResetPasskey />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route exact path='/' element={<Overview />} />
                    <Route
                        exact
                        path='/patientdatabase'
                        element={<Patients />}
                    />
                    <Route
                        exact
                        path='/patientdatabase/view/:id'
                        element={<ViewPatient />}
                    />
                    <Route
                        exact
                        path='/patientdatabase/view/:id/vitals'
                        element={<ViewPatientVitals />}
                    />
                    <Route
                        exact
                        path='/patientdatabase/view/:id/prescription'
                        element={<ViewPatientPrescription />}
                    />
                    <Route exact path='/account' element={<Account />} />
                    <Route exact path='/stats' element={<HealthVitalsMain />} />
                    <Route
                        exact
                        path='/stats/bloodpressure'
                        element={<HealthVitalsBPressure />}
                    />
                    <Route
                        exact
                        path='/stats/bloodsugar'
                        element={<HealthVitalsBSugar />}
                    />
                    <Route
                        exact
                        path='/stats/fitness'
                        element={<HealthVitalsFitness />}
                    />
                    <Route
                        exact
                        path='/stats/emergencylist'
                        element={<EmergencyList />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes
