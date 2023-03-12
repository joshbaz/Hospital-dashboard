import React from 'react'
import { Stack, Button, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { reset, ResetPassword } from '../../store/features/auth/authSlice'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPasskey = () => {
    let toast = useToast()
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let params = useParams()

    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    //validation schema
    const validationSchema = yup.object().shape({
        password: yup.string().required('password is required'),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    const { isError, isSuccess, message } = useSelector((state) => state.auth)

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

            dispatch(reset())
        }

        if (isSuccess && message) {
            if (helperFunctions !== null) {
                toast({
                    position: 'top',
                    title: 'password changed successfully',
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(() => false)
                setIsSubmittingp(() => false)
                setHelperFunctions(() => null)
                routeNavigate('/auth/login', { replace: true })
                dispatch(reset())
            }
            dispatch(reset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, message, dispatch])
    return (
        <Container direction='row'>
            <Stack
                width='100%'
                bg='#ffffff'
                alignItems={'center'}
                justifyContent='center'>
                <Formik
                    initialValues={{
                        password: '',
                        passwordConfirmation: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => {
                        setHelperFunctions(helpers)
                        let allVals = {
                            ...values,
                            tk: params.tk,
                        }
                        dispatch(ResetPassword(allVals))
                        setIsSubmittingp(() => true)
                    }}>
                    {({ values, handleChange, errors, isValid, dirty }) => (
                        <Form>
                            <Stack spacing={'51px'}>
                                {/** head && forms */}
                                <Stack spacing={'61px'}>
                                    <Stack
                                        spacing={0}
                                        alignItems={'center'}
                                        justifyContent='center'>
                                        <TextHead>Reset password</TextHead>
                                    </Stack>

                                    {/** input fields */}
                                    <Stack spacing={'28px'} minW='400px'>
                                        <Stack spacing={'20px'}>
                                            <InputFieldWrap spacing={'8px'}>
                                                <label htmlFor='password'>
                                                    New Password
                                                </label>
                                                <InputField
                                                    id='password'
                                                    type='password'
                                                    autoComplete='current-password'
                                                    placeholder='Enter new password here...'
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    name='password'
                                                />
                                            </InputFieldWrap>
                                            <InputFieldWrap spacing={'8px'}>
                                                <label htmlFor='passwordConfirmation'>
                                                    Confirm Password
                                                </label>
                                                <InputField
                                                    id='passwordConfirmation'
                                                    type='password'
                                                    autoComplete='current-password'
                                                    placeholder='Confirm new password here...'
                                                    value={
                                                        values.passwordConfirmation
                                                    }
                                                    onChange={handleChange}
                                                    name='passwordConfirmation'
                                                />
                                                {errors.passwordConfirmation && (
                                                    <Text color='red'>
                                                        {
                                                            errors.passwordConfirmation
                                                        }
                                                    </Text>
                                                )}
                                            </InputFieldWrap>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                {/** Button */}
                                <FormButton
                                    type='submit'
                                    disabledb={`${!(isValid && dirty)}`}
                                    disabled={!(isValid && dirty)}
                                    isLoading={isSubmittingp ? true : false}
                                    variant='contained'
                                    className='button'>
                                    Reset Password
                                </FormButton>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Stack>
        </Container>
    )
}

export default ResetPasskey

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
        disabledb === 'true' ? '#3e66fb' : '#3e66fb'} !important;
    border: 1px solid #2f6fed;

    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fbfbfb;
    color: ${({ disabledb, submitting, ...props }) =>
        disabledb === 'true' || !submitting ? '#ffffff' : '#000000'};
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.02em;
    outline: none;
    &:hover {
        background: ${({ disabledb, ...props }) =>
            disabledb === 'true' ? '#3e66fb' : '#3e66fb'};
    }
`
