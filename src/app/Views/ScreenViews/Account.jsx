import React from 'react'
import {
    Box,
    Stack,
    Text,
    Input,
    Button,
    Switch,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import styled from 'styled-components'
import TopBar from '../../../components/common/Navigation/TopBar'
import Navigation from '../../../components/common/Navigation/Navigation'
import { Icon } from '@iconify/react'
import '@fontsource/open-sans'
import '@fontsource/roboto'

import {
    GetUserDetails,
    UpdateSettings,
    UpdateDetails,
    UpdatePasskey,
    reset,
} from '../../store/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

const Account = () => {
    let dispatch = useDispatch()
    let toast = useToast()
    const [initialSettingValues, setInitialSettingValues] = React.useState({
        emailEmergency: '',
        emailNewPatients: '',
    })
    const [initialDetailValues, setInitialDetailValues] = React.useState({
        fullname: '',
        mobileNumber: '',
        jobPosition: '',
    })

    // eslint-disable-next-line no-unused-vars
    const [initialPassValues, setInitialPassValues] = React.useState({
        oldPassword: '',
        newPassword: '',
    })
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [EditSettings, setEditSettings] = React.useState(false)
    const [EditDetails, setEditDetails] = React.useState(false)
    const [ChangePassword, setChangePassword] = React.useState(false)
    const { isError, isSuccess, message, userdetails } = useSelector(
        (state) => state.auth
    )

    React.useEffect(() => {
        dispatch(GetUserDetails())
    }, [dispatch])

    React.useEffect(() => {
        if (isError) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            dispatch(reset())
        }

        if (isSuccess && isSubmittingp) {
            if (helperFunctions !== null) {
                toast({
                    position: 'top',
                    title: message.message,
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })

                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                setHelperFunctions(null)
            }
            dispatch(reset())
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, message, dispatch])

    React.useEffect(() => {
        setInitialSettingValues(() => ({
            emailEmergency:
                userdetails !== null && userdetails.emailEmergency
                    ? userdetails.emailEmergency
                    : 'false',
            emailNewPatients:
                userdetails !== null && userdetails.emailNewPatients
                    ? userdetails.emailNewPatients
                    : 'false',
        }))

        setInitialDetailValues(() => ({
            fullname:
                userdetails !== null && userdetails.fullname
                    ? userdetails.fullname
                    : '',
            mobileNumber:
                userdetails !== null && userdetails.mobileNumber
                    ? userdetails.mobileNumber
                    : '',
            jobPosition:
                userdetails !== null && userdetails.jobPosition
                    ? userdetails.jobPosition
                    : '',
        }))
    }, [userdetails])

    //validation schema
    const settingValidationSchema = yup.object().shape({
        emailEmergency: yup.string().required(' required'),
        emailNewPatients: yup.string().required('required'),
    })

    //validation schema for details
    const detailsValidationSchema = yup.object().shape({
        fullname: yup.string().required(' required'),
        mobileNumber: yup.string().required('required'),
        jobPosition: yup.string().required('required'),
    })

    //validation schema for password
    const passwordValidationSchema = yup.object().shape({
        oldPassword: yup.string().required(' required'),
        newPassword: yup.string().required('required'),
    })

    /** for editing settings */
    const activateEditSettings = (data) => {
        setEditSettings(() => true)
    }
    const cancelEditSettingsUpload = () => {
        setEditSettings(() => false)
    }

    /** for editing details */
    const activateEditDetails = (data) => {
        setEditDetails(() => true)
    }
    const cancelEditDetailsUpload = () => {
        setEditDetails(() => false)
    }

    /** for editing password */
    const activateChangeKey = (data) => {
        setChangePassword(() => true)
    }
    const cancelChangeKeyUpload = () => {
        setChangePassword(() => false)
    }
    return (
        <Container direction='row' w='100vw' spacing={'0px'}>
            <Box w='303px' position='relative'>
                <Box w='303px' position='relative' top='0' left='0'>
                    <Navigation />
                </Box>
            </Box>

            <Stack
                paddingBottom={'4%'}
                direction='column'
                w='100%'
                spacing='20px'
                bg='#f9fafa'
                className='data-container'>
                <Box w='100%' h='65px' className='stick'>
                    <TopBar topbarData={{ title: '', count: null }} />
                </Box>

                <Stack h='100%' p='0 30px' spacing='30px'>
                    {/** navigation tools */}
                    <LinkToolsWrap direction='row' alignItems='center'>
                        <Text>Home</Text>

                        <Box>
                            <Icon
                                icon='material-symbols:arrow-back-ios-new'
                                color='#3e66fb'
                                hFlip={true}
                                vFlip={true}
                                width={'12'}
                            />
                        </Box>
                        <Text className='current'>Account</Text>
                    </LinkToolsWrap>

                    {/** first section - input details */}
                    <Stack direction='row'>
                        <InputDetailContainer spacing='25px'>
                            {/** table title */}
                            <TableHeadWrapper direction='row'>
                                <Stack>
                                    <Text className='tablehead_text'>
                                        Profile Information
                                    </Text>
                                </Stack>
                                <Stack>
                                    <Box
                                        onClick={() => activateEditDetails()}
                                        className='tablehead_btn'>
                                        Edit Details
                                    </Box>
                                </Stack>
                            </TableHeadWrapper>

                            <Stack spacing={'25px'}>
                                <Text className='tableform_head'>contact</Text>

                                {/** table */}
                                <Stack direction='column' spacing={'15px'}>
                                    <Stack w='100%'>
                                        <InputWrapper spacing='8px'>
                                            <label>Fullname</label>
                                            <Input
                                                h='35px'
                                                type='text'
                                                readOnly
                                                value={
                                                    userdetails !== null &&
                                                    userdetails.fullname
                                                }
                                                bg={'#f0f2f3'}
                                                placeholder='Search...'
                                            />
                                        </InputWrapper>
                                    </Stack>

                                    <Stack w='100%'>
                                        <InputWrapper spacing='8px'>
                                            <label>Email (Username)</label>
                                            <Input
                                                h='35px'
                                                type='text'
                                                readOnly
                                                value={
                                                    userdetails !== null &&
                                                    userdetails.email
                                                }
                                                bg={'#f0f2f3'}
                                                placeholder='Search...'
                                            />
                                        </InputWrapper>
                                    </Stack>
                                    <Stack w='100%'>
                                        <InputWrapper spacing='8px'>
                                            <label>Mobile</label>
                                            <Input
                                                h='35px'
                                                type='text'
                                                readOnly
                                                value={
                                                    userdetails !== null &&
                                                    userdetails.mobileNumber
                                                }
                                                bg={'#f0f2f3'}
                                                placeholder='Search...'
                                            />
                                        </InputWrapper>
                                    </Stack>

                                    <Stack
                                        direction='column'
                                        w='100%'
                                        spacing='20px'>
                                        <InputWrapper pt='23px'>
                                            <Text>Employment Status</Text>
                                        </InputWrapper>
                                        <Stack w='100%'>
                                            <InputWrapper spacing='8px'>
                                                <label>Job Position</label>
                                                <Input
                                                    h='35px'
                                                    type='text'
                                                    readOnly
                                                    value={
                                                        userdetails !== null &&
                                                        userdetails.jobPosition
                                                    }
                                                    bg={'#f0f2f3'}
                                                    placeholder='Search...'
                                                />
                                            </InputWrapper>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </InputDetailContainer>
                        {/** platform 2 */}

                        <Stack w='50%' spacing='25px'>
                            <InputDetailContainer w='100%' spacing='25px'>
                                {/** table title */}
                                <TableHeadWrapper direction='row'>
                                    <Stack>
                                        <Text className='tablehead_text'>
                                            Platform Settings
                                        </Text>
                                    </Stack>
                                    <Stack>
                                        <Button
                                            onClick={() =>
                                                activateEditSettings()
                                            }
                                            className='tablehead_btn tablehead_btn_c'>
                                            Change Settings
                                        </Button>
                                    </Stack>
                                </TableHeadWrapper>

                                <Stack spacing={'19px'}>
                                    <Text className='tableform_head'>
                                        Account
                                    </Text>

                                    <Stack>
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            spacing='15px'>
                                            <Box>
                                                <Switch
                                                    isChecked={
                                                        userdetails !== null &&
                                                        userdetails.emailEmergency ===
                                                            'true'
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </Box>
                                            <Text className='switch_text'>
                                                Email me when a patient has an
                                                emergency
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                {/** applecation */}
                                <Stack spacing={'20px'}>
                                    <Text className='tableform_head'>
                                        Application
                                    </Text>

                                    <Stack>
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            spacing='15px'>
                                            <Box>
                                                <Switch
                                                    readOnly
                                                    isChecked={
                                                        userdetails !== null &&
                                                        userdetails.emailNewPatients ===
                                                            'true'
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </Box>
                                            <Text className='switch_text'>
                                                New launches and patients
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </InputDetailContainer>

                            {/** password */}
                            <InputDetailContainer w='100%' spacing='25px'>
                                {/** table title */}
                                <TableHeadWrapper direction='row'>
                                    <Stack>
                                        <Text className='tablehead_text'>
                                            Password
                                        </Text>
                                    </Stack>
                                    <Stack>
                                        <Box
                                            onClick={() => activateChangeKey()}
                                            className='tablehead_btn'>
                                            Change Password
                                        </Box>
                                    </Stack>
                                </TableHeadWrapper>

                                <Stack spacing={'20px'}>
                                    {/** table */}
                                    <Stack direction='column'>
                                        <Stack w='100%'>
                                            <InputWrapper spacing='8px'>
                                                <label>Password</label>
                                                <Input
                                                    h='35px'
                                                    readOnly
                                                    type='password'
                                                    value={'passkeys'}
                                                    bg={'#f0f2f3'}
                                                    placeholder='Search...'
                                                />
                                            </InputWrapper>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </InputDetailContainer>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            {/** update all modals */}
            {/** edit platform settings */}
            <Modal
                size=''
                isOpen={EditSettings}
                p='0'
                w=''
                onClose={() => cancelEditSettingsUpload()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' w='50%'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={initialSettingValues}
                            validationSchema={settingValidationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)

                                dispatch(UpdateSettings(values))
                                setIsSubmittingp(() => true)
                                //console.log('values', values)
                            }}>
                            {({
                                values,
                                handleChange,
                                errors,
                                isValid,
                                dirty,
                                touched,
                                setFieldValue,
                            }) => (
                                <Form>
                                    <PopupForm
                                        p='0px'
                                        direction='column'
                                        spacing='0'
                                        justifyContent='space-between'>
                                        <Stack
                                            pb='50px'
                                            direction='column'
                                            spacing={'10px'}
                                            h='100%'>
                                            <Stack
                                                className='pop_title'
                                                direction='row'
                                                w=''
                                                alignItems='center'
                                                justifyContent='space-between'>
                                                <Box>
                                                    <h1>Update Settings</h1>
                                                </Box>
                                            </Stack>

                                            {/** start of switches */}
                                            <Stack
                                                w='100%'
                                                p='10px 30px 10px 30px'
                                                spacing='25px'>
                                                <Stack spacing={'19px'}>
                                                    <Text className='tableform_head'>
                                                        Account
                                                    </Text>

                                                    <Stack>
                                                        <Stack
                                                            direction='row'
                                                            alignItems='center'
                                                            spacing='15px'>
                                                            <Box>
                                                                <Switch
                                                                    isChecked={
                                                                        values.emailEmergency ===
                                                                        'true'
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        let checked =
                                                                            e
                                                                                .target
                                                                                .checked ===
                                                                            true
                                                                                ? 'true'
                                                                                : 'false'

                                                                        setFieldValue(
                                                                            'emailEmergency',
                                                                            checked
                                                                        )
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Text className='switch_text'>
                                                                Email me when a
                                                                patient has an
                                                                emergency
                                                            </Text>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>

                                                {/** applecation */}
                                                <Stack spacing={'20px'}>
                                                    <Text className='tableform_head'>
                                                        Application
                                                    </Text>

                                                    <Stack>
                                                        <Stack
                                                            direction='row'
                                                            alignItems='center'
                                                            spacing='15px'>
                                                            <Box>
                                                                <Switch
                                                                    isChecked={
                                                                        values.emailNewPatients ===
                                                                        'true'
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        let checked =
                                                                            e
                                                                                .target
                                                                                .checked ===
                                                                            true
                                                                                ? 'true'
                                                                                : 'false'

                                                                        setFieldValue(
                                                                            'emailNewPatients',
                                                                            checked
                                                                        )
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Text className='switch_text'>
                                                                New launches and
                                                                patients
                                                            </Text>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            p='0px 20px'
                                            h='65px'
                                            bg='#ffffff'
                                            direction='row'
                                            borderTop='1px solid #E9EDF5'
                                            borderRadius='0 0 8px 8px'
                                            justifyContent='flex-end'
                                            alignItems='center'>
                                            <Button
                                                variant='outline'
                                                className='cancel_button'
                                                onClick={() =>
                                                    cancelEditSettingsUpload()
                                                }>
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={!(isValid && dirty)}
                                                isLoading={
                                                    isSubmittingp ? true : false
                                                }
                                                className='apply_button'
                                                type='submit'>
                                                Confirm
                                            </Button>
                                        </Stack>
                                    </PopupForm>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/** edit profile Information */}
            <Modal
                size=''
                isOpen={EditDetails}
                p='0'
                w=''
                onClose={() => cancelEditDetailsUpload()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' w='50%'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={initialDetailValues}
                            validationSchema={detailsValidationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)

                                dispatch(UpdateDetails(values))
                                setIsSubmittingp(() => true)
                                //console.log('values', values)
                            }}>
                            {({
                                values,
                                handleChange,
                                errors,
                                isValid,
                                dirty,
                                touched,
                                setFieldValue,
                            }) => (
                                <Form>
                                    <PopupForm
                                        p='0px'
                                        direction='column'
                                        spacing='0'
                                        justifyContent='space-between'>
                                        <Stack
                                            pb='50px'
                                            direction='column'
                                            spacing={'10px'}
                                            h='100%'>
                                            <Stack
                                                className='pop_title'
                                                direction='row'
                                                w=''
                                                alignItems='center'
                                                justifyContent='space-between'>
                                                <Box>
                                                    <h1>
                                                        Update Profile
                                                        Information
                                                    </h1>
                                                </Box>
                                            </Stack>

                                            {/** start of switches */}
                                            <Stack
                                                w='100%'
                                                p='10px 30px 10px 30px'
                                                spacing='25px'>
                                                <Stack spacing={'19px'}>
                                                    <Stack>
                                                        <Stack w='100%'>
                                                            <InputWrapper spacing='8px'>
                                                                <label>
                                                                    Fullname
                                                                </label>
                                                                <Input
                                                                    h='35px'
                                                                    type='text'
                                                                    name='fullname'
                                                                    value={
                                                                        values.fullname
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    bg={
                                                                        '#f0f2f3'
                                                                    }
                                                                    placeholder='Search...'
                                                                />
                                                            </InputWrapper>
                                                        </Stack>

                                                        <Stack w='100%'>
                                                            <InputWrapper spacing='8px'>
                                                                <label>
                                                                    Mobile
                                                                </label>
                                                                <Input
                                                                    h='35px'
                                                                    type='text'
                                                                    name='mobileNumber'
                                                                    value={
                                                                        values.mobileNumber
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    bg={
                                                                        '#f0f2f3'
                                                                    }
                                                                    placeholder='Search...'
                                                                />
                                                            </InputWrapper>
                                                        </Stack>

                                                        <Stack w='100%'>
                                                            <InputWrapper spacing='8px'>
                                                                <label>
                                                                    Job Position
                                                                </label>
                                                                <Input
                                                                    h='35px'
                                                                    type='text'
                                                                    name='jobPosition'
                                                                    value={
                                                                        values.jobPosition
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    bg={
                                                                        '#f0f2f3'
                                                                    }
                                                                    placeholder='Search...'
                                                                />
                                                            </InputWrapper>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            p='0px 20px'
                                            h='65px'
                                            bg='#ffffff'
                                            direction='row'
                                            borderTop='1px solid #E9EDF5'
                                            borderRadius='0 0 8px 8px'
                                            justifyContent='flex-end'
                                            alignItems='center'>
                                            <Button
                                                variant='outline'
                                                className='cancel_button'
                                                onClick={() =>
                                                    cancelEditDetailsUpload()
                                                }>
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={!(isValid && dirty)}
                                                isLoading={
                                                    isSubmittingp ? true : false
                                                }
                                                className='apply_button'
                                                type='submit'>
                                                Confirm
                                            </Button>
                                        </Stack>
                                    </PopupForm>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/** change password */}
            <Modal
                size=''
                isOpen={ChangePassword}
                p='0'
                w=''
                onClose={() => cancelChangeKeyUpload()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' w='50%'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={initialPassValues}
                            validationSchema={passwordValidationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)

                                dispatch(UpdatePasskey(values))
                                setIsSubmittingp(() => true)
                                //console.log('values', values)
                            }}>
                            {({
                                values,
                                handleChange,
                                errors,
                                isValid,
                                dirty,
                                touched,
                                setFieldValue,
                            }) => (
                                <Form>
                                    <PopupForm
                                        p='0px'
                                        direction='column'
                                        spacing='0'
                                        justifyContent='space-between'>
                                        <Stack
                                            pb='50px'
                                            direction='column'
                                            spacing={'10px'}
                                            h='100%'>
                                            <Stack
                                                className='pop_title'
                                                direction='row'
                                                w=''
                                                alignItems='center'
                                                justifyContent='space-between'>
                                                <Box>
                                                    <h1>Change Password</h1>
                                                </Box>
                                            </Stack>

                                            {/** start of switches */}
                                            <Stack
                                                w='100%'
                                                p='10px 30px 10px 30px'
                                                spacing='25px'>
                                                <Stack spacing={'19px'}>
                                                    <Stack>
                                                        <Stack w='100%'>
                                                            <InputWrapper spacing='8px'>
                                                                <label>
                                                                    Old Password
                                                                </label>
                                                                <Input
                                                                    h='35px'
                                                                    type='password'
                                                                    name='oldPassword'
                                                                    value={
                                                                        values.oldPassword
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    bg={
                                                                        '#f0f2f3'
                                                                    }
                                                                    placeholder='old password'
                                                                />
                                                            </InputWrapper>
                                                        </Stack>

                                                        <Stack w='100%'>
                                                            <InputWrapper spacing='8px'>
                                                                <label>
                                                                    New Password
                                                                </label>
                                                                <Input
                                                                    h='35px'
                                                                    type='password'
                                                                    name='newPassword'
                                                                    value={
                                                                        values.newPassword
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    bg={
                                                                        '#f0f2f3'
                                                                    }
                                                                    placeholder='new password'
                                                                />
                                                            </InputWrapper>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            p='0px 20px'
                                            h='65px'
                                            bg='#ffffff'
                                            direction='row'
                                            borderTop='1px solid #E9EDF5'
                                            borderRadius='0 0 8px 8px'
                                            justifyContent='flex-end'
                                            alignItems='center'>
                                            <Button
                                                variant='outline'
                                                className='cancel_button'
                                                onClick={() =>
                                                    cancelChangeKeyUpload()
                                                }>
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={!(isValid && dirty)}
                                                isLoading={
                                                    isSubmittingp ? true : false
                                                }
                                                className='apply_button'
                                                type='submit'>
                                                Confirm
                                            </Button>
                                        </Stack>
                                    </PopupForm>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default Account

const Container = styled(Stack)`
    min-height: 100vh;
    .stick {
        position: -webkit-sticky !important;
        position: sticky !important;
        top: 0;
    }

    .s_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: #1a2240;
    }

    .sumbox {
        width: 296.44px;
        height: 93px;

        background: #ffffff;
        box-shadow: 0px 4.65px 34.875px rgba(0, 0, 0, 0.03);
        border-radius: 10.4625px;
        cursor: pointer;
    }
`

const TableHeadWrapper = styled(Stack)`
    justify-content: space-between;
    align-items: center;
    .tablehead_text {
        font-family: 'Helvetica';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }

    .tablehead_subtext {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #a6abaf;
    }

    .tablehead_btn {
        background: #3e66fb;
        border-radius: 8px;
        padding: 8px 16px;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #ffffff;
    }

    .tablehead_btn_c {
        background: #f0f2f3;
        color: #92979d;
    }
`

const InputDetailContainer = styled(Stack)`
    background: #fff;
    padding: 28px 29px;
    border-radius: 10px;
    width: 50%;

    .tableform_head {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 150%;
        text-transform: uppercase;
        color: #92979d;
    }

    .switch_text {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;

        color: #92979d;
    }
`

const InputWrapper = styled(Stack)`
    label {
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #16191c;
    }

    input {
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #16191c;
    }

    p {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 13px;
        line-height: 150%;
        text-transform: uppercase;
        color: #92979d;
    }
`

const LinkToolsWrap = styled(Stack)`
    p {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #92979d;
    }

    .current {
        color: #1f2225;
        font-weight: 600;
    }
`

const PopupForm = styled(Stack)`
    width: 100%;
    min-height: 182px;
    height: 100%;
    background: #fbfbfb;
    box-shadow: 0px 0px 0px 1px rgba(152, 161, 178, 0.1),
        0px 30px 70px -10px rgba(17, 24, 38, 0.25),
        0px 10px 30px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    span {
        margin: 0 5px;
    }

    .pop_title {
        height: 45px;
        width: 100%;

        border-bottom: 1px solid #ebeefa;
        padding: 0 30px;
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: bold;
            font-size: 17px;
            line-height: 21px;
            color: #111827;
        }
    }

    .form_head {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 150%;
        text-transform: uppercase;
        color: #92979d;
    }

    .content {
        input {
            border-radius: 6px;
            width: 100%;
            font-style: normal;
            font-weight: 500;

            line-height: 20px;
            color: #20202a;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
        }

        radio {
            color: #20202a;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
        }
    }

    .content_title {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
    }

    .form_container {
        .label {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #5e5c60;
            letter-spacing: 0.02em;
            border: 1px dashed #fbb649;
            background: #fef9ef;
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
            border-radius: 6px;
            height: 49px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            span {
                padding-left: 5px;
                color: #1371ff;
            }
        }

        .fileview {
            background: #ffffff;
            border: 1px solid #eeeeef;

            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
            border-radius: 6px;
            min-height: 50px;
        }

        .label2 {
            border: 1px solid transparent;
            height: 47px;
            border-radius: 6px 0 0 6px;
            background: #eeeeef;
        }
    }

    .savelabel {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
    }

    .icon_stack {
        border-radius: 8px;
        height: 40px;
        justify-content: center;
        align-items: center;

        .icon_stack_text {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
        }

        .icon_stack_icon {
            font-size: 14px;
        }
    }

    .toggleText {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 12px;
        color: rgba(194, 201, 209, 1);
    }

    .filestitle {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        color: #1a2240;
    }

    .cancel_button {
        padding: 6px 12px;
        height: 32px;
        color: #3e66fb;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px;
        background: #ffffff;
    }
    .apply_button {
        height: 32px;
        padding: 6px 12px;
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        letter-spacing: 0.02em;

        background: #3e66fb;

        border-radius: 6px;

        &:hover {
            background: #3e66fb;
        }
    }
`
