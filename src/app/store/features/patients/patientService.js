import axios from 'axios'
import { BASE_API_ } from '../../../../middleware/base_url.config'
import Cookies from 'js-cookie'
let errorFunction = (error) => {
    let errorArray = []
    errorArray.push(error)

    let response = {
        message: '',
        type: 'error',
    }

    if (errorArray.length !== 0 && errorArray[0].response) {
        response.message = errorArray[0].response.data
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
        response.message = errorArray[0].message
    }

    return response
}

let getToken = Cookies.get('_tk')

//Creation of patient
const patientCreate = async (details) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/patient/v1/create`,
            details,
            {
                headers: {
                    Authorization: 'Brearer ' + getToken,
                },
            }
        )

        return {
            message: response.data,
            type: 'success',
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//Creation of patient prescription
const createPrescription = async (details) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/patient/v1/prescription/create/${details.id}`,
            details,
            {
                headers: {
                    Authorization: 'Brearer ' + getToken,
                },
            }
        )

        return {
            message: response.data,
            type: 'success',
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}


//edit of patient prescription
const editPrescription = async (details) => {
    try {
        const response = await axios.put(
            `${BASE_API_}/patient/v1/prescription/update/${details._id}`,
            details,
            {
                headers: {
                    Authorization: 'Brearer ' + getToken,
                },
            }
        )

        return {
            message: response.data,
            type: 'success',
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//create of patient refill
const createRefill = async (details) => {
    try {
        const response = await axios.put(
            `${BASE_API_}/patient/v1/prescription/refill/create/${details._id}`,
            details,
            {
                headers: {
                    Authorization: 'Brearer ' + getToken,
                },
            }
        )

        return {
            message: response.data,
            type: 'success',
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//get all patients
const getAllPatients = async () => {
    try {
        const response = await axios.get(`${BASE_API_}/patient/v1/all`, {
            headers: {
                Authorization: 'Brearer ' + getToken,
            },
        })

        return {
            ...response.data,
            type: 'success',
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//get individual vital summary
const getIndividualVitalSummary = async (details) => {
    try {
        const response = await axios.get(
            `${BASE_API_}/patient/v1/individual/vitalsummary/${details.id}`,
            {
                headers: {
                    Authorization: 'Brearer ' + getToken,
                },
            }
        )

        return {
            ...response.data,
            type: 'success',
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//get individual prescription summary
const getIndividualPrescriptionSummary = async (details) => {
    try {
        const response = await axios.get(
            `${BASE_API_}/patient/v1/individual/prescriptionsummary/${details.id}`,
            {
                headers: {
                    Authorization: 'Brearer ' + getToken,
                },
            }
        )

        return {
            ...response.data,
            type: 'success',
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//get individual patient
const getIndividualPatient = async (details) => {
    try {
        const response = await axios.get(
            `${BASE_API_}/patient/v1/individual/${details.id}`,
            {
                headers: {
                    Authorization: 'Brearer ' + getToken,
                },
            }
        )

        return {
            ...response.data,
            type: 'success',
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

const patientService = {
    patientCreate,
    getAllPatients,
    getIndividualVitalSummary,
    getIndividualPatient,
    getIndividualPrescriptionSummary,
    createPrescription,
    editPrescription,
}

export default patientService
