import React from 'react'
import {
    Box,
    Stack,
    Button,
    Text,
    Checkbox,
    HStack,
    useToast,
} from '@chakra-ui/react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import {
    Login as LoginAction,
    reset,
} from '../../store/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Logint = () => {
    let toast = useToast()
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()

    //in-house state
    const [passError, setPassError] = React.useState(false)
    const [usernameError, setUserNameError] = React.useState(false)
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    //validation schema
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('required'),
        password: yup.string().required('password is required'),
    })

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    React.useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)

                setIsSubmittingp(false)
            }
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            if (message === 'Email does not exist') {
                setUserNameError(true)
            }

            if (message === 'Wrong Password') {
                setPassError(true)
            }

            dispatch(reset())
        }

        if (isSuccess && user) {
            if (helperFunctions !== null) {
                toast({
                    position: 'top',
                    title: 'successfully loggedIn',
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                setHelperFunctions(null)
                routeNavigate('/', { replace: true })
            }
            dispatch(reset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isError, isSuccess, message, dispatch])
    return (
        <Container direction='row'>
            <Stack
                width='70%'
                bg='#ffffff'
                alignItems={'center'}
                justifyContent='center'>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => {
                        setHelperFunctions(helpers)
                        dispatch(LoginAction(values))
                        setIsSubmittingp(() => true)
                    }}>
                    {({
                        values,
                        handleChange,
                        errors,
                        isValid,
                        dirty,
                        touched,
                    }) => (
                        <Form>
                            <Stack spacing={'51px'}>
                                {/** head && forms */}
                                <Stack spacing={'61px'}>
                                    <Stack
                                        spacing={0}
                                        alignItems={'center'}
                                        justifyContent='center'>
                                        <TextSubHead>Welcome Back!</TextSubHead>

                                        <TextHead>
                                            Log in to your account
                                        </TextHead>
                                    </Stack>

                                    {/** input fields */}
                                    <Stack spacing={'28px'}>
                                        <Stack spacing={'20px'}>
                                            <InputFieldWrap spacing={'8px'}>
                                                <label htmlFor='username'>
                                                    Username
                                                </label>
                                                <InputField
                                                    id='username'
                                                    placeholder='username'
                                                    type='email'
                                                    name='email'
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                            </InputFieldWrap>
                                            <InputFieldWrap spacing={'8px'}>
                                                <label htmlFor='password'>
                                                    Password
                                                </label>
                                                <InputField
                                                    id='password'
                                                    type='password'
                                                    placeholder='password'
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    name='password'
                                                />
                                            </InputFieldWrap>
                                        </Stack>

                                        <HStack
                                            justifyContent={'space-between'}>
                                            <Box className='checkbox'>
                                                <Checkbox colorScheme='blue'>
                                                    Stay signed in
                                                </Checkbox>
                                            </Box>

                                            <Box className='forgotpasskey'>
                                                <Text>Forgot Password?</Text>
                                            </Box>
                                        </HStack>
                                    </Stack>
                                </Stack>

                                {/** Button */}
                                <FormButton
                                    type='submit'
                                    disabledb={!(isValid && dirty)}
                                    disabled={!(isValid && dirty)}
                                    isLoading={isSubmittingp ? true : false}
                                    submitting={isSubmittingp}
                                    variant='contained'
                                    className='button'>
                                    Sign in
                                </FormButton>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Stack>
            <Box bg='#f3f4f5' width='30%'></Box>
        </Container>
    )
}

export default Logint

const Container = styled(Stack)`
    height: 100vh;
    width: 100vw;
    font-family: 'Roboto';

    .checkbox {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #838389;
    }

    .forgotpasskey {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #7488d3;
    }
`

const TextSubHead = styled(Text)`
    font-weight: 400;
    font-size: 15px;

    color: #878a8c;
`

const TextHead = styled(Text)`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    color: #2a3d84;
    line-height: 38px;
`

const InputFieldWrap = styled(Stack)`
    label {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #000000;
    }
`

const InputField = styled.input`
    height: 40px;
    width: 100%;
    border-radius: 8px;
    text-indent: 2px;
    border: 1px solid #eceef1;
    text-indent: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    border-radius: 6px;

    &:focus {
        outline: none;
        border: 1px solid #2f6fed;
    }
`

const FormButton = styled(Button)`
    width: 100%;
    height: 40px;
    background: ${({ disabledb, ...props }) =>
        disabledb ? '#3e66fb' : '#3e66fb'} !important;
    border: 1px solid #2f6fed;

    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fbfbfb;
    color: ${({ disabledb, submitting, ...props }) =>
        disabledb || !submitting ? '#ffffff' : '#000000'};
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.02em;
    outline: none;
    &:hover {
        background: ${({ disabledb, ...props }) =>
            disabledb ? '#3e66fb' : '#3e66fb'};
    }
`
