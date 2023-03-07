/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {
    Box,
    Stack,
    Text,
    Input,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    useToast,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import styled from 'styled-components'
import TopBar from '../../../components/common/Navigation/TopBar'
import Navigation from '../../../components/common/Navigation/Navigation'

import { Icon } from '@iconify/react'
import '@fontsource/open-sans'
import '@fontsource/roboto'
import { useNavigate, useParams } from 'react-router-dom'
import {
    GetIndividualVitalSummary,
    GetIndividualPatient,
    reset,
} from '../../store/features/patients/patientSlice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment-timezone'
import Cookies from 'js-cookie'
import { io } from 'socket.io-client'
import { BASE_API_ } from '../../../middleware/base_url.config'
let socket = io(BASE_API_, {
    transports: ['websocket'],
    upgrade: false,
    //reconnection: false,
})

const TableHeadNewData = [
    {
        title: 'Date Measured',
    },
    {
        title: 'Health Type',
    },
    {
        title: 'Health Vital (Value)',
    },
    {
        title: 'Status',
    },
]

const TableHeadNewData2 = [
    {
        title: 'PscbID',
    },
    {
        title: 'Drug Name',
    },
    {
        title: 'Generic Name',
    },
    {
        title: 'Class',
    },
    {
        title: 'Prescribed',
    },
    {
        title: 'Last Prescribed',
    },
    {
        title: 'Status',
    },
    {
        title: 'Refill Request',
    },
]

const ViewPatient = () => {
    let routeNavigate = useNavigate()
    let params = useParams()
    let toast = useToast()
    let dispatch = useDispatch()

    const [allDisplayData, setAllDisplayData] = React.useState({
        items: [],
    })
    const [allPrescribedData, setAllPrescribedData] = React.useState({
        items: [],
    })
    const [vDateType, setVDateType] = React.useState('Monthly')

    React.useEffect(() => {
        Cookies.set('vDatetype', vDateType)
    }, [vDateType])

    React.useEffect(() => {
        socket.on('update-dash-patient', (data) => {
            if (
                data.actions === 'request-vital-pull' &&
                data.data === params.id
            ) {
                dispatch(GetIndividualVitalSummary(params))
                dispatch(GetIndividualPatient(params))
            }
        })

        socket.on('update-prescription', (data) => {
            if (
                data.actions === 'request-prescription-pull' &&
                data.data === params.id
            ) {
                dispatch(GetIndividualVitalSummary(params))
                dispatch(GetIndividualPatient(params))
            }
        })

        return () => {
            socket.off('update-dash-patient')
            socket.off('update-prescription')
            socket.disconnect()
            //LocalSockets.removeAllListeners('update-dash-vitals')

            // io.disconnect()
        }
    }, [dispatch])

    React.useEffect(() => {
        dispatch(GetIndividualVitalSummary(params))
        dispatch(GetIndividualPatient(params))
    }, [params, dispatch, vDateType])
    const {
        isError,
        isSuccess,
        message,
        individualVitalSummary,
        individualPatient,
    } = useSelector((state) => state.patient)

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, message, dispatch])

    React.useEffect(() => {
        let allQueriedItems = []
        // eslint-disable-next-line array-callback-return
        allQueriedItems = individualPatient.vitals.filter((data) => {
            return data
        })

        allQueriedItems.splice(8)

        setAllDisplayData({
            items: allQueriedItems,
        })
    }, [individualPatient.vitals])

    React.useEffect(() => {
        let allQueriedItems = []
        // eslint-disable-next-line array-callback-return
        allQueriedItems = individualPatient.prescription.filter((data) => {
            return data
        })

        allQueriedItems.splice(8)

        setAllPrescribedData({
            items: allQueriedItems,
        })
    }, [individualPatient.prescription])

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
                                color='#92979d'
                                hFlip={true}
                                vFlip={true}
                                width={'12'}
                            />
                        </Box>
                        <Text>Patient Database</Text>
                        <Box>
                            <Icon
                                icon='material-symbols:arrow-back-ios-new'
                                color='#3e66fb'
                                hFlip={true}
                                vFlip={true}
                                width={'12'}
                            />
                        </Box>
                        <Text className='current'>
                            Patient ID -{' '}
                            {individualPatient.patient !== null
                                ? individualPatient.patient.patientId
                                : ''}
                        </Text>
                    </LinkToolsWrap>

                    {/** first section - input details */}
                    <InputDetailContainer spacing='25px'>
                        {/** table title */}
                        <TableHeadWrapper direction='row'>
                            <Stack>
                                <Text className='tablehead_text'>
                                    Patient Details
                                </Text>
                            </Stack>
                        </TableHeadWrapper>

                        {/** table */}
                        <Stack direction='column'>
                            <Stack direction='row' w='100%'>
                                <InputWrapper spacing='8px' w='50%'>
                                    <label>Phone</label>
                                    <Input
                                        h='35px'
                                        type='text'
                                        readOnly
                                        value={
                                            individualPatient.patient !==
                                                null &&
                                            individualPatient.patient
                                                .phoneNumber
                                                ? individualPatient.patient
                                                      .phoneNumber
                                                : ''
                                        }
                                        bg={'#f0f2f3'}
                                        placeholder='phone number'
                                    />
                                </InputWrapper>

                                <InputWrapper spacing='8px' w='50%'>
                                    <label>Fullname</label>
                                    <Input
                                        h='35px'
                                        type='text'
                                        readOnly
                                        value={
                                            individualPatient.patient !==
                                                null &&
                                            individualPatient.patient
                                                .patientName
                                                ? individualPatient.patient
                                                      .patientName
                                                : ''
                                        }
                                        bg={'#f0f2f3'}
                                        placeholder='patient name'
                                    />
                                </InputWrapper>
                            </Stack>

                            <Stack w='100%'>
                                <InputWrapper spacing='8px'>
                                    <label>Birthday</label>
                                    <Input
                                        h='35px'
                                        type='text'
                                        readOnly
                                        value={
                                            individualPatient.patient !==
                                                null &&
                                            individualPatient.patient.birthday
                                                ? individualPatient.patient
                                                      .birthday
                                                : ''
                                        }
                                        bg={'#f0f2f3'}
                                        placeholder='birthday'
                                    />
                                </InputWrapper>
                            </Stack>

                            <Stack direction='row'>
                                <InputWrapper spacing='8px' w='50%'>
                                    <label>Weight</label>
                                    <Input
                                        h='35px'
                                        type='text'
                                        readOnly
                                        value={
                                            individualPatient.patient !==
                                                null &&
                                            individualPatient.patient.weight
                                                ? individualPatient.patient
                                                      .weight
                                                : ''
                                        }
                                        bg={'#f0f2f3'}
                                        placeholder='weight'
                                    />
                                </InputWrapper>

                                <InputWrapper spacing='8px' w='50%'>
                                    <label>Height</label>
                                    <Input
                                        h='35px'
                                        type='text'
                                        readOnly
                                        value={
                                            individualPatient.patient !==
                                                null &&
                                            individualPatient.patient.height
                                                ? individualPatient.patient
                                                      .height
                                                : ''
                                        }
                                        bg={'#f0f2f3'}
                                        placeholder='height'
                                    />
                                </InputWrapper>
                            </Stack>
                        </Stack>
                    </InputDetailContainer>

                    {/** second section  - vitals summary*/}
                    <Stack spacing='25px'>
                        {/** table title */}
                        <TableHeadWrapper direction='row'>
                            <Stack>
                                <Text className='tablehead_text'>
                                    Vitals Summary
                                </Text>
                            </Stack>

                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <Menu>
                                    <MenuButton>
                                        <SelectorDropDown
                                            direction='row'
                                            className='month'>
                                            <Box
                                                w='70%'
                                                className='selector_text'>
                                                <Text>
                                                    {' '}
                                                    {vDateType === 'Monthly'
                                                        ? 'Monthly'
                                                        : vDateType}
                                                </Text>
                                            </Box>

                                            <Box
                                                w='30%'
                                                className='selector_icon'>
                                                <Box>
                                                    <Icon
                                                        icon='material-symbols:arrow-back-ios-new'
                                                        color='#616569'
                                                        rotate={1}
                                                        hFlip={true}
                                                        vFlip={true}
                                                        width={'12'}
                                                    />
                                                </Box>
                                            </Box>
                                        </SelectorDropDown>
                                    </MenuButton>

                                    <MenuList>
                                        <MenuItem
                                            onClick={() =>
                                                setVDateType(() => 'Monthly')
                                            }>
                                            Monthly
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setVDateType(() => 'Weekly')
                                            }>
                                            Weekly
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Stack>
                        </TableHeadWrapper>

                        {/** table */}
                        <Stack direction='row' alignItems='center'>
                            <SummaryContainer spacing='10px'>
                                <Text className='sum_text'>
                                    Before Breakfast
                                </Text>
                                <Text className='sum_fig'>
                                    {individualVitalSummary.BeforeBF}
                                </Text>
                                <Text
                                    className={`sum_percent ${
                                        individualVitalSummary.beforeBF_Percent <
                                        0
                                            ? 'decline'
                                            : 'rise'
                                    }`}>
                                    {' '}
                                    {individualVitalSummary.beforeBF_Percent}%
                                </Text>
                            </SummaryContainer>
                            <SummaryContainer spacing='10px'>
                                <Text className='sum_text'>Before Lunch</Text>
                                <Text className='sum_fig'>
                                    {' '}
                                    {individualVitalSummary.BeforeLunch}
                                </Text>
                                <Text
                                    className={`sum_percent ${
                                        individualVitalSummary.beforeLunch_Percent <
                                        0
                                            ? 'decline'
                                            : 'rise'
                                    }`}>
                                    {' '}
                                    {individualVitalSummary.beforeLunch_Percent}
                                    %
                                </Text>
                            </SummaryContainer>
                            <SummaryContainer spacing='10px'>
                                <Text className='sum_text'>Before Dinner</Text>
                                <Text className='sum_fig'>
                                    {' '}
                                    {individualVitalSummary.BeforeDinner}
                                </Text>
                                <Text
                                    className={`sum_percent ${
                                        individualVitalSummary.beforeDinner_Percent <
                                        0
                                            ? 'decline'
                                            : 'rise'
                                    }`}>
                                    {
                                        individualVitalSummary.beforeDinner_Percent
                                    }
                                    %
                                </Text>
                            </SummaryContainer>
                            <SummaryContainer spacing='10px'>
                                <Text className='sum_text'>Before Bedtime</Text>
                                <Text className='sum_fig'>
                                    {' '}
                                    {individualVitalSummary.BeforeBedtime}
                                </Text>
                                <Text
                                    className={`sum_percent ${
                                        individualVitalSummary.beforeBedtime_Percent <
                                        0
                                            ? 'decline'
                                            : 'rise'
                                    }`}>
                                    {' '}
                                    {
                                        individualVitalSummary.beforeBedtime_Percent
                                    }
                                    %
                                </Text>
                            </SummaryContainer>
                        </Stack>
                    </Stack>

                    {/** third section - recent vitals */}

                    <Stack spacing='25px'>
                        {/** table title */}
                        <TableHeadWrapper direction='row'>
                            <Stack>
                                <Text className='tablehead_text'>
                                    Recent Vitals
                                </Text>
                            </Stack>
                        </TableHeadWrapper>

                        {/** table */}
                        <Stack spacing='20px'>
                            <TableContainer>
                                <Table size='sm'>
                                    <Thead>
                                        <Tr>
                                            {TableHeadNewData.map(
                                                (data, index) => {
                                                    return (
                                                        <Th
                                                            key={index}
                                                            className='table_head'>
                                                            <Stack
                                                                direction='row'
                                                                alignItems={
                                                                    'center'
                                                                }
                                                                justifyContent={
                                                                    data.title ===
                                                                        'Status' &&
                                                                    'center'
                                                                }>
                                                                <Text>
                                                                    {data.title}
                                                                </Text>
                                                            </Stack>
                                                        </Th>
                                                    )
                                                }
                                            )}
                                        </Tr>
                                    </Thead>

                                    <Tbody>
                                        {allDisplayData.items.length > 0 ? (
                                            <>
                                                {allDisplayData.items.map(
                                                    (data, index) => {
                                                        let createdDate =
                                                            moment(
                                                                new Date(
                                                                    data.createdDate
                                                                )
                                                            )
                                                                .tz(
                                                                    'Africa/Nairobi'
                                                                )
                                                                .format(
                                                                    'DD MMM YYYY h:mm a'
                                                                )
                                                        return (
                                                            <Tr
                                                                className={`table_row `}
                                                                key={data._id}>
                                                                <Td
                                                                    style={{
                                                                        color: '#5E5C60',
                                                                        fontWeight: 500,
                                                                    }}>
                                                                    {
                                                                        createdDate
                                                                    }
                                                                </Td>

                                                                <Td
                                                                    minW='150px'
                                                                    maxW='150px'
                                                                    className='studentName'
                                                                    style={{
                                                                        color: '#15151D',
                                                                        fontWeight: 500,
                                                                        fontSize:
                                                                            '13px',
                                                                    }}>
                                                                    {
                                                                        data.healthType
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    {
                                                                        data.healthVital
                                                                    }{' '}
                                                                    {data.healthType ===
                                                                        'Blood Glucose' &&
                                                                        'mg/dl'}{' '}
                                                                    {data.healthType ===
                                                                        'Blood Pressure' &&
                                                                        'mm/Hg'}
                                                                </Td>

                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    <Stack
                                                                        alignItems='center'
                                                                        justifyContent='center'>
                                                                        <Box
                                                                            className={`status ${
                                                                                data.status ===
                                                                                    'normal' &&
                                                                                'normal'
                                                                            } ${
                                                                                data.status ===
                                                                                'concern'
                                                                                    ? 'concern'
                                                                                    : ''
                                                                            } ${
                                                                                data.status ===
                                                                                    'critical low' ||
                                                                                data.status ===
                                                                                    'critical low' ||
                                                                                data.status ===
                                                                                    'critical high' ||
                                                                                data.status ===
                                                                                    'high'
                                                                                    ? 'critical'
                                                                                    : ''
                                                                            }`}>
                                                                            {
                                                                                data.status
                                                                            }
                                                                        </Box>
                                                                    </Stack>
                                                                </Td>
                                                            </Tr>
                                                        )
                                                    }
                                                )}
                                            </>
                                        ) : (
                                            <Tr
                                                position='relative'
                                                h='48px'
                                                borderBottom={
                                                    '1px solid #E1FCEF'
                                                }>
                                                <Box>
                                                    <NoItems>
                                                        No Records Found
                                                    </NoItems>
                                                </Box>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>

                            {/** pagination */}

                            <Stack justifyContent='center' alignItems='center'>
                                <ViewButton
                                    onClick={() =>
                                        routeNavigate(
                                            `/patientdatabase/view/${params.id}/vitals`
                                        )
                                    }
                                    direction='row'
                                    className='month'>
                                    <Box className='viewbutton_text'>
                                        <Text>See all vitals</Text>
                                    </Box>

                                    <Box className='viewbutton_icon'>
                                        <Box>
                                            <Icon
                                                icon='material-symbols:arrow-forward'
                                                color='#616569'
                                                width='20px'
                                                height='20px'
                                            />
                                        </Box>
                                    </Box>
                                </ViewButton>
                            </Stack>
                        </Stack>
                    </Stack>

                    {/** Prescriptions */}
                    <Stack spacing='25px'>
                        {/** table title */}
                        <TableHeadWrapper direction='row'>
                            <Stack>
                                <Text className='tablehead_text'>
                                    Prescriptions
                                </Text>
                                <Text className='tablehead_subtext'>
                                    All vitals that have recently been updated.
                                </Text>
                            </Stack>
                        </TableHeadWrapper>

                        {/** table */}
                        <Stack spacing='20px'>
                            <TableContainer>
                                <Table size='sm'>
                                    <Thead>
                                        <Tr>
                                            {TableHeadNewData2.map(
                                                (data, index) => {
                                                    return (
                                                        <Th
                                                            key={index}
                                                            className='table_head'>
                                                            <Stack
                                                                direction='row'
                                                                alignItems={
                                                                    'center'
                                                                }
                                                                justifyContent={
                                                                    data.title ===
                                                                        'Status' &&
                                                                    'center'
                                                                }>
                                                                <Text>
                                                                    {data.title}
                                                                </Text>
                                                            </Stack>
                                                        </Th>
                                                    )
                                                }
                                            )}
                                        </Tr>
                                    </Thead>

                                    <Tbody>
                                        {allPrescribedData.items.length > 0 ? (
                                            <>
                                                {allPrescribedData.items.map(
                                                    (data) => {
                                                        let createdDate =
                                                            moment(
                                                                new Date(
                                                                    data.lastPrescribed
                                                                )
                                                            )
                                                                .tz(
                                                                    'Africa/Nairobi'
                                                                )
                                                                .format(
                                                                    'DD MMM YYYY h:mm a'
                                                                )
                                                        return (
                                                            <Tr
                                                                className={`table_row `}
                                                                key={data._id}>
                                                                <Td
                                                                    style={{
                                                                        color: '#5E5C60',
                                                                        fontWeight: 500,
                                                                    }}>
                                                                    {
                                                                        data.prescriptionId
                                                                    }
                                                                </Td>

                                                                <Td
                                                                    minW='150px'
                                                                    maxW='150px'
                                                                    className='studentName'
                                                                    style={{
                                                                        color: '#15151D',
                                                                        fontWeight: 500,
                                                                        fontSize:
                                                                            '13px',
                                                                    }}>
                                                                    {
                                                                        data.drugName
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    {
                                                                        data.genericName
                                                                    }
                                                                </Td>

                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    {
                                                                        data.drugclass
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    {
                                                                        data.prescribed
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    {
                                                                        createdDate
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    {
                                                                        data.status
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    {
                                                                        data
                                                                            .refillRequest
                                                                            .length
                                                                    }
                                                                </Td>
                                                            </Tr>
                                                        )
                                                    }
                                                )}
                                            </>
                                        ) : (
                                            <Tr
                                                position='relative'
                                                h='48px'
                                                borderBottom={
                                                    '1px solid #E1FCEF'
                                                }>
                                                <Box>
                                                    <NoItems>
                                                        No Records Found
                                                    </NoItems>
                                                </Box>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>

                            {/** pagination */}

                            <Stack justifyContent='center' alignItems='center'>
                                <ViewButton
                                    onClick={() =>
                                        routeNavigate(
                                            `/patientdatabase/view/${params.id}/prescription`
                                        )
                                    }
                                    w='200px'
                                    direction='row'
                                    className='month'>
                                    <Box className='viewbutton_text'>
                                        <Text>See all prescriptions</Text>
                                    </Box>

                                    <Box className='viewbutton_icon'>
                                        <Box>
                                            <Icon
                                                icon='material-symbols:arrow-forward'
                                                color='#616569'
                                                width='20px'
                                                height='20px'
                                            />
                                        </Box>
                                    </Box>
                                </ViewButton>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default ViewPatient

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
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 500;
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
`

const SelectorDropDown = styled(Stack)`
    width: 114px;
    height: 32px;
    background: #ffffff;
    border: 1px solid #92979d;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    .selector_text {
        font-family: 'Open Sans', sans-serif;

        color: #616569;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .selector_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border-left: 1px solid #92979d;
    }
`

const TableContainer = styled(Box)`
    table {
        background: #ffffff;
        border: 1px solid rgba(33, 33, 33, 0.08);
        border-radius: 4px;
    }

    .table_head {
        color: #92979d !important;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13px !important;
        height: 60px;
        text-transform: capitalize;
        border-bottom: 1px solid transparent;
    }

    .table_row {
        height: 60px !important;
    }

    .status {
        min-width: 100px;
        background: #f2f2f2;

        border-radius: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        padding: 5px 15px;
        text-transform: capitalize;
    }

    .normal {
        color: #2d912c;
        background: #ceefce;
    }

    .critical {
        color: #b4292a;
        background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.75),
                rgba(255, 255, 255, 0.75)
            ),
            #f03738;
    }

    .concern {
        color: #b68c15;
        background: #fceec6;
    }
`
const NoItems = styled(Box)`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
`

const ViewButton = styled(Stack)`
    width: 150px;
    height: 32px;
    background: #ffffff;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    border: 1px solid #92979d;
    .viewbutton_text {
        font-family: 'Open Sans', sans-serif;

        color: #616569;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .viewbutton_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
`

const SummaryContainer = styled(Stack)`
    background: #ffffff;
    border: 1.30758px solid rgba(22, 25, 28, 0.1);
    border-radius: 10.4607px;
    height: 147px;
    width: 25%;
    padding: 21px 0 21px 30px;

    .sum_text {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #616569;
    }
    .sum_fig {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 30px;
        line-height: 29px;
    }
    .sum_percent {
        border-radius: 24px;
        width: 58px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
    }

    .decline {
        background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.75),
                rgba(255, 255, 255, 0.75)
            ),
            #f03738;
        color: #b4292a;
    }

    .rise {
        background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.75),
                rgba(255, 255, 255, 0.75)
            ),
            #3cc13b;
        color: #2d912c;
    }
`

const InputDetailContainer = styled(Stack)`
    background: #fff;
    padding: 28px 29px;
    border-radius: 10px;
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
