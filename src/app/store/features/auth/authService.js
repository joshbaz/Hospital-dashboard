import axios from 'axios'
import { BASE_API_ } from '../../../../middleware/base_url.config'
import Cookies from 'js-cookie'
let errorFunction = (error) => {
    let errorArray = []
    errorArray.push(error)

    let responsedd = {
        message: '',
        type: 'error',
    }
    if (errorArray.length !== 0 && errorArray[0].response) {
        responsedd.message = errorArray[0].response.data
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
        responsedd.message = errorArray[0].message
    }

    return responsedd
}

//login attempt
const Login = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/admin/v1/login`,
            userData
        )

        let dataCollected = { ...response.data, type: 'success' }

        Cookies.set('_tk', dataCollected.token)
        //user
        Cookies.set('user', JSON.stringify({ ...dataCollected, type: null }))

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

const logout = async () => {
    Cookies.remove('_tk')
    Cookies.remove('user')
}

const authService = {
    Login,
    logout,
}

export default authService
