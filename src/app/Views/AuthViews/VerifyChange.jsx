import React from 'react'
import { Stack, Button, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'

import { reset, VerifyPasskeyReset } from '../../store/features/auth/authSlice'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyChange = () => {
    let routeNavigate = useNavigate()
    let toast = useToast()
    let dispatch = useDispatch()
    let params = useParams()
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = React.useState(true)
    const [errorMessage, setErrorMessage] = React.useState('')

    const { isError, isSuccess, message } = useSelector((state) => state.auth)

    React.useEffect(() => {
        dispatch(VerifyPasskeyReset(params.tk))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    React.useEffect(() => {
        if (isError) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            setErrorMessage(() => message)

            dispatch(reset())
        }

        if (isSuccess && message) {
            toast({
                position: 'top',
                title: 'verification successful',
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            dispatch(reset())
            routeNavigate(`/auth/ResetPasskey/${params.tk}`, { replace: true })
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
                {isLoading ? (
                    <Stack
                        spacing={'40px'}
                        alignItems={'center'}
                        justifyContent='center'>
                        <Button
                            h='100px'
                            w='100%'
                            style={{
                                fontSize: '60px',
                            }}
                            isLoading={isLoading ? true : false}></Button>
                        <Stack
                            spacing={'10px'}
                            alignItems={'center'}
                            justifyContent='center'>
                            <TextHead>Verifying...</TextHead>
                            <TextSubHead>Please wait</TextSubHead>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack
                        spacing={'20px'}
                        alignItems={'center'}
                        justifyContent='center'>
                        <ErrorHead>Verification Message</ErrorHead>
                        <ErrorSubHead>{errorMessage}</ErrorSubHead>
                        <FormButton
                            onClick={() => {
                                routeNavigate('/auth/login', { replace: true })
                            }}
                            type='submit'
                            variant='contained'
                            className='button'>
                            Back to Login
                        </FormButton>
                    </Stack>
                )}
            </Stack>
        </Container>
    )
}

export default VerifyChange

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

const TextSubHead = styled(Text)`
    font-weight: 400;
    font-size: 15px;

    color: #878a8c;
`

const ErrorHead = styled(Text)`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    color: #2a3d84;
    line-height: 38px;
`

const ErrorSubHead = styled(Text)`
    font-weight: 400;
    font-size: 22px;
    font-family: 'Roboto';
    color: red;
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
