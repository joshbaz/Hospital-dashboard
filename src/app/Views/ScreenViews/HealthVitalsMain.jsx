import React from 'react'
import {
    Box,
    Stack,
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    useToast,
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
]

const HealthVitalsMain = () => {
    let dispatch = useDispatch()
    let toast = useToast()
    const [graphData, setGraphData] = React.useState([])

    React.useEffect(() => {
        dispatch(GetMainSummaryVitals())
        dispatch(GetMainRecentVitals())
        dispatch(GetMainMonthlySummaryVitals())
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
                                    <SelectorDropDown
                                        w='170px'
                                        direction='row'
                                        className='month'>
                                        <Box w='70%' className='selector_text'>
                                            <Text>Before Breakfast</Text>
                                        </Box>

                                        <Box w='30%' className='selector_icon'>
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
                                <SelectorDropDown
                                    direction='row'
                                    className='month'>
                                    <Box w='70%' className='selector_text'>
                                        <Text>All Status</Text>
                                    </Box>

                                    <Box w='30%' className='selector_icon'>
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
                                <SelectorDropDown
                                    direction='row'
                                    className='month'>
                                    <Box w='70%' className='selector_text'>
                                        <Text>Sort By</Text>
                                    </Box>

                                    <Box w='30%' className='selector_icon'>
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
                                        {recentMainVitals.allvitals.length >
                                        0 ? (
                                            <>
                                                {recentMainVitals.allvitals.map(
                                                    (data, index) => {
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
                                                                        data.dateMeasured
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
                                                                    }
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
                                                                                    'Normal' &&
                                                                                'normal'
                                                                            } ${
                                                                                data.status ===
                                                                                    'Critical Low' &&
                                                                                'critical'
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
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
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
        width: 100px;
        background: #f2f2f2;

        border-radius: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        padding: 5px 15px;
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
