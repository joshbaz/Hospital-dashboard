/* eslint-disable array-callback-return */
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Checkbox,
    Button,
    Radio,
    RadioGroup,
} from '@chakra-ui/react'
import styled from 'styled-components'
import TopBar from '../../../components/common/Navigation/TopBar'
import Navigation from '../../../components/common/Navigation/Navigation'
import {
    VictoryContainer,
    VictoryAxis,
    VictoryChart,
    VictoryArea,
    VictoryScatter,
} from 'victory'
import { Icon } from '@iconify/react'
import '@fontsource/open-sans'
import '@fontsource/roboto'

import {
    GetMainSummaryVitals,
    GetMainRecentVitals,
    GetMainMonthlySummaryVitals,
    reset,
} from '../../store/features/patients/patientSlice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment-timezone'
import { initSocketConnection } from '../../../socketio.service'

const TableHeadNewData2 = [
    {
        title: 'userID',
    },
    {
        title: 'Patient Name',
    },
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
    {
        title: '',
    },
]

const CheckboxList = [
    {
        title: 'Any Bleeding?',
    },
    {
        title: 'Chills?',
    },
    {
        title: 'Chest pain with exertion?',
    },
    {
        title: 'Shortness of breath?',
    },
    {
        title: 'Cough?',
    },
    {
        title: 'Palpitations?',
    },
    {
        title: 'Fever?',
    },
    {
        title: 'Legs swelling?',
    },
    {
        title: 'Headache?',
    },
]

const feelingList = [
    {
        title: 'OK',
    },
    {
        title: 'Bad',
    },
    {
        title: 'Sick',
    },
]
let io = initSocketConnection()
const HealthVitalsMain = () => {
    let dispatch = useDispatch()
    let toast = useToast()
    const [graphData, setGraphData] = React.useState([])
    const [Statuses, setStatuses] = React.useState('')
    const [vitalTimeType, setVitalTimeType] = React.useState('Before Breakfast')
    const [allDisplayData, setAllDisplayData] = React.useState({
        items: [],
    })

    const [viewDetailsModal, setViewDetailsModal] = React.useState(false)
    const [symptomDetails, setSymptomDetails] = React.useState(null)

    const handleSymptomView = (data) => {
        setSymptomDetails(() => data)
        setViewDetailsModal(() => true)
    }

    const handleSymptomCancel = () => {
        setSymptomDetails(() => null)
        setViewDetailsModal(() => false)
    }
    React.useEffect(() => {
        io.on('update-dash-vitals', (data) => {
            if (data.actions === 'request-vitals-bg') {
                dispatch(GetMainSummaryVitals())
                dispatch(GetMainRecentVitals())
                dispatch(GetMainMonthlySummaryVitals(vitalTimeType))
            }
            if (data.actions === 'request-vitals-bp') {
                dispatch(GetMainSummaryVitals())
                dispatch(GetMainRecentVitals())
                dispatch(GetMainMonthlySummaryVitals(vitalTimeType))
            }

            if (data.actions === 'request-vitals-fa') {
                dispatch(GetMainSummaryVitals())
                dispatch(GetMainRecentVitals())
                dispatch(GetMainMonthlySummaryVitals(vitalTimeType))
            }
        })

        return () => {
            //io.removeAllListeners('update-dash-vitals')

            io.off('update-dash-vitals')
        }
    }, [vitalTimeType, io])

    React.useEffect(() => {
        dispatch(GetMainMonthlySummaryVitals(vitalTimeType))
    }, [vitalTimeType])

    React.useEffect(() => {
        dispatch(GetMainSummaryVitals())
        dispatch(GetMainRecentVitals())
    }, [dispatch])
    const {
        isError,
        isSuccess,
        message,
        recentMainVitals,
        mainVitalSummary,
        mainMonthlyVitalSummary,
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
        setGraphData(() => mainMonthlyVitalSummary.stats)
    }, [mainMonthlyVitalSummary.stats])

    React.useEffect(() => {
        let allQueriedItems = []
        // eslint-disable-next-line array-callback-return
        allQueriedItems = recentMainVitals.allvitals.filter((data) => {
            if (Statuses === '') {
                return data
            } else {
                if (data.status === Statuses) {
                    return data
                }
            }
        })

        allQueriedItems.splice(8)

        setAllDisplayData({
            items: allQueriedItems,
        })
    }, [recentMainVitals.allvitals, Statuses])

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
                <Box w='100%' h='65px' className='stick' zIndex={'20'}>
                    <TopBar topbarData={{ title: '', count: null }} />
                </Box>

                <Stack h='100%' p='0 30px' spacing='30px'>
                    {/** graph and stats */}
                    <GraphContainer direction='row' w='100%' spacing={'40px'}>
                        <Stack w='50%'>
                            <TableHeadWrapper direction='row' w='93%'>
                                <Stack>
                                    <Text className='tablehead_text'>
                                        Vitals Submitted
                                    </Text>
                                </Stack>

                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <Menu>
                                        <MenuButton>
                                            {' '}
                                            <SelectorDropDown
                                                w='170px'
                                                direction='row'
                                                className='month'>
                                                <Box
                                                    w='70%'
                                                    className='selector_text'>
                                                    <Text>
                                                        {vitalTimeType ===
                                                        'Before Breakfast'
                                                            ? 'Before Breakfast'
                                                            : vitalTimeType}
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
                                                    setVitalTimeType(
                                                        () => 'Before Breakfast'
                                                    )
                                                }>
                                                Before Breakfast
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setVitalTimeType(
                                                        () => 'Before Lunch'
                                                    )
                                                }>
                                                Before Lunch
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setVitalTimeType(
                                                        () => 'Before Dinner'
                                                    )
                                                }>
                                                Before Dinner
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setVitalTimeType(
                                                        () => 'Before Bedtime'
                                                    )
                                                }>
                                                Before Bedtime
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Stack>
                            </TableHeadWrapper>

                            {/** Line graph */}

                            <Stack w='100%' h='inherit'>
                                <VictoryChart
                                    width={600}
                                    height={400}
                                    containerComponent={
                                        <VictoryContainer responsive={true} />
                                    }
                                    domainPadding={{ x: 0, y: 0 }}>
                                    <VictoryArea
                                        style={{
                                            data: {
                                                fill: '#f8f8f9',
                                                fillOpacity: 1,
                                                stroke: '#e93b3c',
                                                strokeWidth: 3,
                                            },
                                        }}
                                        data={graphData}
                                    />

                                    <VictoryScatter
                                        data={graphData}
                                        r={8}
                                        style={{
                                            data: {
                                                fill: ({ datum }) =>
                                                    datum.x === 3
                                                        ? '#ffffff'
                                                        : '#ffffff',
                                                stroke: ({ datum }) =>
                                                    datum.x === 3
                                                        ? '#e93b3c'
                                                        : '#e93b3c',
                                                fillOpacity: 1,
                                                strokeWidth: 2.5,
                                            },
                                            labels: {
                                                fontSize: 150,
                                                fill: ({ datum }) =>
                                                    datum.x === 3
                                                        ? '#000000'
                                                        : '#c43a31',
                                            },
                                        }}
                                        size={5}
                                    />

                                    <VictoryAxis
                                        style={{
                                            axis: {
                                                stroke: '#e3e3e3',
                                            },
                                            axisLabel: {
                                                fontSize: 20,
                                                padding: 0,
                                                fontColor: 'red',
                                            },
                                            grid: {
                                                stroke: ({ tick }) =>
                                                    tick > 0.5
                                                        ? '#e5e5e5'
                                                        : '#e5e5e5',
                                            },
                                            ticks: {
                                                stroke: '#8E8E93',
                                                size: 5,
                                                display: 'none',
                                            },
                                            tickLabels: {
                                                width: '100%',
                                                fontSize: 15,
                                                paddingRight: 0,
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fill: '#919496',
                                            },
                                        }}
                                        dependentAxis={true}
                                    />
                                    <VictoryAxis
                                        style={{
                                            axis: {
                                                stroke: '#e3e3e3',
                                            },
                                            axisLabel: {
                                                fontSize: 20,
                                                padding: 0,
                                            },
                                            grid: {
                                                stroke: ({ tick }) =>
                                                    tick > 0.5 ? '' : '',
                                            },
                                            ticks: {
                                                stroke: 'black',
                                                size: 5,
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                display: 'none',
                                            },
                                            tickLabels: {
                                                width: '100%',
                                                fill: '#919496',
                                                fontSize: 15,
                                                paddingRight: 0,
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            },
                                        }}
                                        dependentAxis={false}
                                    />
                                </VictoryChart>
                            </Stack>
                        </Stack>
                        {/** stats */}
                        <Stack w='50%'>
                            <Stack direction='row'>
                                {' '}
                                <SummaryContainer spacing='10px'>
                                    <Text className='sum_text'>
                                        Before Breakfast
                                    </Text>

                                    <Stack spacing='20px'>
                                        <Stack
                                            direction='row'
                                            spacing={'30%'}
                                            alignItems='center'>
                                            <Text className='sum_fig'>
                                                {' '}
                                                {mainVitalSummary.BeforeBF}
                                            </Text>
                                            <Text
                                                className={`sum_percent ${
                                                    mainVitalSummary.beforeBF_Percent <
                                                    0
                                                        ? 'decline'
                                                        : 'rise'
                                                }`}>
                                                {
                                                    mainVitalSummary.beforeBF_Percent
                                                }
                                                %
                                            </Text>
                                        </Stack>
                                        <Text className='sum_duration '>
                                            Last 7 days
                                        </Text>
                                    </Stack>
                                </SummaryContainer>
                                <SummaryContainer spacing='10px'>
                                    <Text className='sum_text'>
                                        Before Lunch
                                    </Text>

                                    <Stack spacing='20px'>
                                        <Stack
                                            direction='row'
                                            spacing={'30%'}
                                            alignItems='center'>
                                            <Text className='sum_fig'>
                                                {' '}
                                                {mainVitalSummary.BeforeLunch}
                                            </Text>
                                            <Text
                                                className={`sum_percent ${
                                                    mainVitalSummary.beforeLunch_Percent <
                                                    0
                                                        ? 'decline'
                                                        : 'rise'
                                                }`}>
                                                {
                                                    mainVitalSummary.beforeLunch_Percent
                                                }
                                                %
                                            </Text>
                                        </Stack>
                                        <Text className='sum_duration '>
                                            Last 7 days
                                        </Text>
                                    </Stack>
                                </SummaryContainer>
                            </Stack>
                            <Stack direction='row'>
                                <SummaryContainer spacing='10px'>
                                    <Text className='sum_text'>
                                        Before Dinner
                                    </Text>
                                    <Stack spacing='20px'>
                                        <Stack
                                            direction='row'
                                            spacing={'30%'}
                                            alignItems='center'>
                                            <Text className='sum_fig'>
                                                {' '}
                                                {mainVitalSummary.BeforeDinner}
                                            </Text>
                                            <Text
                                                className={`sum_percent ${
                                                    mainVitalSummary.beforeDinner_Percent <
                                                    0
                                                        ? 'decline'
                                                        : 'rise'
                                                }`}>
                                                {
                                                    mainVitalSummary.beforeDinner_Percent
                                                }
                                                %
                                            </Text>
                                        </Stack>
                                        <Text className='sum_duration '>
                                            Last 7 days
                                        </Text>
                                    </Stack>
                                </SummaryContainer>
                                <SummaryContainer spacing='10px'>
                                    <Text className='sum_text'>
                                        Before Bedtime
                                    </Text>
                                    <Stack spacing='20px'>
                                        <Stack
                                            direction='row'
                                            spacing={'30%'}
                                            alignItems='center'>
                                            <Text className='sum_fig'>
                                                {' '}
                                                {mainVitalSummary.BeforeBedtime}
                                            </Text>
                                            <Text
                                                className={`sum_percent ${
                                                    mainVitalSummary.beforeBedtime_Percent <
                                                    0
                                                        ? 'decline'
                                                        : 'rise'
                                                }`}>
                                                {
                                                    mainVitalSummary.beforeBedtime_Percent
                                                }
                                                %
                                            </Text>
                                        </Stack>
                                        <Text className='sum_duration '>
                                            Last 7 days
                                        </Text>
                                    </Stack>
                                </SummaryContainer>
                            </Stack>
                        </Stack>
                    </GraphContainer>

                    {/** Prescriptions */}
                    <Stack spacing='25px'>
                        {/** table title */}
                        <TableHeadWrapper direction='row'>
                            <Stack>
                                <Text className='tablehead_text'>
                                    Recent Vitals
                                </Text>
                                <Text className='tablehead_subtext'>
                                    All vitals that have recently been updated.
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
                                                    {Statuses !== ''
                                                        ? Statuses
                                                        : 'All Status'}
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
                                                setStatuses(() => '')
                                            }>
                                            All Status
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setStatuses(() => 'normal')
                                            }>
                                            Normal
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setStatuses(() => 'low')
                                            }>
                                            Low
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setStatuses(() => 'high')
                                            }>
                                            High
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setStatuses(
                                                    () => 'critical low'
                                                )
                                            }>
                                            Critical Low
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setStatuses(
                                                    () => 'critical high'
                                                )
                                            }>
                                            Critical High
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setStatuses(() => 'concern')
                                            }>
                                            Concern
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
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

                                    {/** body */}
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
                                                                        data
                                                                            .patientUniqueId
                                                                            .patientId
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
                                                                        data
                                                                            .patientUniqueId
                                                                            .patientName
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
                                                                                    'low' ||
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

                                                                <Td>
                                                                    <ViewButton
                                                                        direction='row'
                                                                        className='month'
                                                                        onClick={() =>
                                                                            handleSymptomView(
                                                                                data
                                                                            )
                                                                        }>
                                                                        <Box
                                                                            w='70%'
                                                                            className='viewbutton_text'>
                                                                            <Text>
                                                                                View
                                                                                Details
                                                                            </Text>
                                                                        </Box>
                                                                    </ViewButton>
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
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            {/** modal for viewing symptoms */}
            <Modal
                size=''
                isOpen={viewDetailsModal}
                p='0'
                w=''
                onClose={() => handleSymptomCancel()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' w='50%'>
                    <ModalBody p='0'>
                        <PopupContent
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
                                        <h1>Vitals</h1>
                                    </Box>
                                </Stack>

                                {/** vitals */}
                                <Stack p='10px 20px 10px 20px' spacing='20px'>
                                    <Text className='form_head'>
                                        vital details
                                    </Text>

                                    <Stack
                                        className='content'
                                        direction='column'
                                        w='100%'>
                                        {/** date */}
                                        <Stack
                                            direction='column'
                                            spacing='11px'>
                                            <Box
                                                className='form_input'
                                                w='100%'
                                                minW='200px'>
                                                <Input
                                                    bg='#ffffff'
                                                    placeholder='Insert drug name'
                                                    size='md'
                                                    type='text'
                                                    name='drugName'
                                                    value={
                                                        symptomDetails !==
                                                            null &&
                                                        symptomDetails.createdDate
                                                            ? moment(
                                                                  new Date(
                                                                      symptomDetails.createdDate
                                                                  )
                                                              )
                                                                  .tz(
                                                                      'Africa/Nairobi'
                                                                  )
                                                                  .format(
                                                                      'DD MMM YYYY h:mm a'
                                                                  )
                                                            : ''
                                                    }
                                                />
                                            </Box>
                                        </Stack>

                                        {/** type */}
                                        <Stack
                                            direction='column'
                                            spacing='11px'>
                                            <Box className='content_title'>
                                                Type
                                            </Box>

                                            <Box
                                                className='form_input'
                                                w='100%'
                                                minW='200px'>
                                                <Input
                                                    bg='#ffffff'
                                                    placeholder='Insert drug name'
                                                    size='md'
                                                    type='text'
                                                    name='drugName'
                                                    value={
                                                        symptomDetails !==
                                                            null &&
                                                        symptomDetails.healthType
                                                            ? symptomDetails.healthType
                                                            : ''
                                                    }
                                                />
                                            </Box>
                                        </Stack>

                                        {/** health vital */}
                                        <Stack
                                            direction='column'
                                            spacing='11px'>
                                            <Box className='content_title'>
                                                Health Vital (Value)
                                            </Box>

                                            <Box
                                                className='form_input'
                                                w='100%'
                                                minW='200px'>
                                                <Input
                                                    bg='#ffffff'
                                                    placeholder='Insert drug name'
                                                    size='md'
                                                    type='text'
                                                    name='drugName'
                                                    value={
                                                        symptomDetails !==
                                                            null &&
                                                        symptomDetails.healthVital
                                                            ? `${
                                                                  symptomDetails.healthVital
                                                              } ${
                                                                  symptomDetails.healthType ===
                                                                  'Blood Glucose'
                                                                      ? 'mg/dl'
                                                                      : ''
                                                              }  ${
                                                                  symptomDetails.healthType ===
                                                                  'Blood Pressure'
                                                                      ? 'mm/Hg'
                                                                      : ''
                                                              }`
                                                            : ''
                                                    }
                                                />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                {/** other symptoms */}
                                {symptomDetails !== null &&
                                symptomDetails.healthType !==
                                    'Fitness Activities' ? (
                                    <Stack
                                        p='10px 20px 10px 20px'
                                        spacing='20px'>
                                        <Text className='form_head'>
                                            other symptoms
                                        </Text>

                                        <Stack
                                            className='content'
                                            direction='column'
                                            w='100%'>
                                            {/** client is feeling */}
                                            <Stack
                                                direction='column'
                                                spacing='11px'>
                                                <Box className='content_title'>
                                                    How client is feeling
                                                </Box>

                                                <Box
                                                    className='form_input'
                                                    w='100%'
                                                    minW='200px'>
                                                    <RadioGroup>
                                                        {feelingList.map(
                                                            (fdata, index) => {
                                                                return (
                                                                    <Radio
                                                                        isChecked={
                                                                            symptomDetails !==
                                                                                null &&
                                                                            symptomDetails
                                                                                .otherSymptoms
                                                                                .feeling ===
                                                                                fdata.title
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        key={
                                                                            index
                                                                        }>
                                                                        {
                                                                            fdata.title
                                                                        }
                                                                    </Radio>
                                                                )
                                                            }
                                                        )}
                                                    </RadioGroup>
                                                </Box>
                                            </Stack>

                                            {/** list of symptoms */}
                                            <Stack
                                                direction='column'
                                                spacing='11px'>
                                                <Box className='content_title'>
                                                    list of symptoms
                                                </Box>

                                                <Box
                                                    className='form_input'
                                                    w='100%'
                                                    minW='200px'>
                                                    {CheckboxList.map(
                                                        (data, index) => {
                                                            let checked =
                                                                symptomDetails !==
                                                                    null &&
                                                                symptomDetails
                                                                    .otherSymptoms
                                                                    .symptoms
                                                                    ? symptomDetails.otherSymptoms.symptoms.some(
                                                                          (
                                                                              datas
                                                                          ) => {
                                                                              if (
                                                                                  datas.title ===
                                                                                  data.title
                                                                              ) {
                                                                                  return true
                                                                              }
                                                                          }
                                                                      )
                                                                    : false
                                                            return (
                                                                <Checkbox
                                                                    isChecked={
                                                                        checked
                                                                    }
                                                                    w='300px'
                                                                    h='30px'
                                                                    key={index}>
                                                                    {data.title}{' '}
                                                                </Checkbox>
                                                            )
                                                        }
                                                    )}
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                ) : null}
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
                                    className='apply_button'
                                    onClick={handleSymptomCancel}>
                                    Close
                                </Button>
                            </Stack>
                        </PopupContent>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default HealthVitalsMain

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

const ViewButton = styled(Stack)`
    width: 114px;
    height: 32px;
    background: #ffffff;
    cursor: pointer;

    border-radius: 8px;
    align-items: center;
    justify-content: center;
    .viewbutton_text {
        font-family: 'Open Sans', sans-serif;

        color: #3e66fb;
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

const SummaryContainer = styled(Stack)`
    background: #ffffff;
    border: 1.30758px solid rgba(22, 25, 28, 0.1);
    border-radius: 10.4607px;
    height: 147px;
    width: 50%;
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

    .sum_duration {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 16px;
        color: #92979d;
    }
`

const GraphContainer = styled(Stack)`
    background: #ffffff;
    border-radius: 10px;
    padding: 35px 41px;
`

const PopupContent = styled(Stack)`
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

    .chakra-switch__thumb {
        margin: 0 !important;
    }
`
