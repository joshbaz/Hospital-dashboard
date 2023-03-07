import React from 'react'
import {
    Box,
    Stack,
    Text,
    useToast,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import styled from 'styled-components'
import TopBar from '../../../components/common/Navigation/TopBar'
import Navigation from '../../../components/common/Navigation/Navigation'
import {
    VictoryPie,
    VictoryLabel,
    VictoryContainer,
    VictoryAxis,
    VictoryBar,
    VictoryChart,
} from 'victory'
import { Icon } from '@iconify/react'
import '@fontsource/open-sans'
import '@fontsource/roboto'

import {
    GetdashboardReports,
    GetdashboardPieGraph,
    GetdashboardBarGraph,
    reset,
} from '../../store/features/patients/patientSlice'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
//import { initSocketConnection } from '../../../socketio.service'
import { io } from 'socket.io-client'
import { BASE_API_ } from '../../../middleware/base_url.config'
let socket = io(BASE_API_, {
    transports: ['websocket'],
    upgrade: false,
    //reconnection: false,
})
const Overview = () => {
    let dispatch = useDispatch()
    let toast = useToast()
    const [pieDateType, setPieDateType] = React.useState('Monthly')
    const [barDateType, setBarDateType] = React.useState('Monthly')
    const [pieData, setPieData] = React.useState([])
    const [barData, setBarData] = React.useState([])

    React.useEffect(() => {
        Cookies.set('ptype', pieDateType)
    }, [pieDateType])

    React.useEffect(() => {
        Cookies.set('bartype', barDateType)
    }, [barDateType])
    React.useState(() => {
        socket.on('update-dash-vitals', (data) => {
            if (data.actions === 'request-vitals-bg') {
                dispatch(GetdashboardReports())
                dispatch(GetdashboardPieGraph())
            }
            if (data.actions === 'request-vitals-bp') {
                dispatch(GetdashboardReports())
                dispatch(GetdashboardPieGraph())
            }

            if (data.actions === 'request-vitals-fa') {
                dispatch(GetdashboardReports())
                dispatch(GetdashboardPieGraph())
            }

            if (data.actions === 'request-new-patient') {
                dispatch(GetdashboardReports())
                dispatch(GetdashboardBarGraph())
            }
        })

        return () => {
            socket.off('update-dash-vitals')
            socket.disconnect()
            //LocalSockets.removeAllListeners('update-dash-vitals')

            // io.disconnect()
        }
    }, [dispatch])

    React.useEffect(() => {
        dispatch(GetdashboardPieGraph(pieDateType))
    }, [pieDateType, dispatch])

    React.useEffect(() => {
        dispatch(GetdashboardBarGraph(barDateType))
    }, [barDateType, dispatch])

    React.useEffect(() => {
        dispatch(GetdashboardReports())
    }, [dispatch])

    const {
        isError,
        isSuccess,
        message,
        dashboardReports,
        dashboardPieReports,
        dashboardBarReports,
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
        setPieData(() => dashboardPieReports.reports)
    }, [dashboardPieReports.reports])

    React.useEffect(() => {
        setBarData(() => dashboardBarReports.reports)
    }, [dashboardBarReports.reports])
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

                <Stack h='100%' p='0 30px' spacing='20px'>
                    {/** first section */}
                    <Stack direction='row' w='100%' spacing={'20px'}>
                        {/** list stats */}
                        <ListStatWrapper w='45%'>
                            <Stack direction='row'>
                                {' '}
                                <ListStatContainer
                                    bg='#e4f9e9'
                                    p='21px 19px'
                                    justifyContent='space-between'>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='16px'>
                                        <Box className='lstat_icon'>
                                            <Icon
                                                icon='healthicons:people'
                                                color='#46cf8d'
                                                width={30}
                                            />
                                        </Box>

                                        <Text className='lstat_title'>
                                            Patients
                                        </Text>
                                    </Stack>

                                    <Stack spacing='15px'>
                                        <Text className='lstat_val'>
                                            {' '}
                                            {dashboardReports.Patients}
                                        </Text>

                                        <Text className='lstat_duration'>
                                            Last 7 days
                                        </Text>
                                    </Stack>
                                </ListStatContainer>
                                <ListStatContainer
                                    bg='#fed8d9'
                                    p='21px 19px'
                                    justifyContent='space-between'>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='16px'>
                                        <Box className='lstat_icon'>
                                            <Icon
                                                icon='healthicons:blood-drop'
                                                color='#ee6b63'
                                                width={30}
                                            />
                                        </Box>

                                        <Text className='lstat_title'>
                                            Blood E-Reports
                                        </Text>
                                    </Stack>

                                    <Stack spacing='15px'>
                                        <Text className='lstat_val'>
                                            {' '}
                                            {dashboardReports.BloodReports}
                                        </Text>

                                        <Text className='lstat_duration'>
                                            Last 7 days
                                        </Text>
                                    </Stack>
                                </ListStatContainer>
                            </Stack>

                            <Stack direction='row'>
                                {' '}
                                <ListStatContainer
                                    bg='#fff0d9'
                                    p='21px 19px'
                                    justifyContent='space-between'>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        w='100%'
                                        spacing='16px'>
                                        <Box className='lstat_icon'>
                                            <Icon
                                                icon='healthicons:exercise-walk-supported'
                                                color='#bf7400'
                                                width={30}
                                            />
                                        </Box>

                                        <Text className='lstat_title'>
                                            Fitness E-Reports
                                        </Text>
                                    </Stack>

                                    <Stack spacing='15px'>
                                        <Text className='lstat_val'>
                                            {' '}
                                            {dashboardReports.FitnessReports}
                                        </Text>

                                        <Text className='lstat_duration'>
                                            Last 7 days
                                        </Text>
                                    </Stack>
                                </ListStatContainer>
                                <ListStatContainer
                                    bg='#e7e1fa'
                                    p='21px 18px'
                                    justifyContent='space-between'>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='14px'>
                                        <Box className='lstat_icon'>
                                            <Icon
                                                icon='healthicons:cardiogram'
                                                color='#9747ff'
                                                width={30}
                                            />
                                        </Box>

                                        <Text className='lstat_title'>
                                            Emergency List
                                        </Text>
                                    </Stack>

                                    <Stack spacing='15px'>
                                        <Text className='lstat_val'>
                                            {' '}
                                            {dashboardReports.EmergencyList}
                                        </Text>

                                        <Text className='lstat_duration'>
                                            Last 7 days
                                        </Text>
                                    </Stack>
                                </ListStatContainer>
                            </Stack>
                        </ListStatWrapper>

                        <PieStatWrapper
                            direction='row'
                            w='60%'
                            justifyContent='space-between'
                            p='0 30px'>
                            <Stack w='60%' h='75%' className='piechart'>
                                <Stack>
                                    <Text>Health Vitals Submitted By Type</Text>
                                </Stack>

                                <Stack>
                                    <svg viewBox='0 0 550 550'>
                                        <VictoryPie
                                            containerComponent={
                                                <VictoryContainer
                                                    responsive={false}
                                                />
                                            }
                                            standalone={false}
                                            width={550}
                                            height={550}
                                            data={pieData}
                                            innerRadius={({ datum }) =>
                                                datum.x === 'Blood Pressure'
                                                    ? 150
                                                    : 150
                                            }
                                            padAngle={({ datum }) =>
                                                datum.highest === 'true' ? 1 : 0
                                            }
                                            radius={({ datum }) =>
                                                datum.highest === 'true'
                                                    ? 217
                                                    : 210
                                            }
                                            cornerRadius={7}
                                            labels={() => ''}
                                            colorScale={[
                                                '#e5665e',
                                                '#47cd8c',
                                                '#9747ff',
                                            ]}
                                        />

                                        <circle
                                            cx={275}
                                            cy={275}
                                            r={145}
                                            fill='none'
                                            stroke='rgb(166,166,166)'
                                            strokeWidth={3}
                                            stroke-dasharray='5,6'
                                            className='circle1'
                                        />
                                        <circle
                                            cx={275}
                                            cy={275}
                                            r={140}
                                            fill={`rgb(225,228,232)`}
                                            className='circle2'
                                        />
                                        <circle
                                            cx={275}
                                            cy={275}
                                            r={110}
                                            strokeWidth={1}
                                            stroke='rgba(194, 201, 209, 1)'
                                            fill='white'
                                        />
                                        <VictoryLabel
                                            textAnchor='middle'
                                            verticalAnchor='middle'
                                            x={275}
                                            y={275}
                                            style={[
                                                {
                                                    fill: '#292D30',
                                                    fontSize: 30,
                                                    fontWeight: '700',
                                                    paddingBottom: '20px',
                                                },
                                                {
                                                    fill: '#474B4E',
                                                    fontFamily: 'Roboto',
                                                    fontSize: 14,
                                                    paddingBottom: '80px',
                                                },
                                                {
                                                    fill: '#474B4E',
                                                    fontFamily: 'Roboto',
                                                    fontSize: 28,
                                                    paddingBottom: '80px',
                                                },
                                            ]}
                                            text={[
                                                'Overall',
                                                ' ',
                                                `${dashboardPieReports.overallTotal}`,
                                            ]}
                                        />
                                    </svg>
                                </Stack>
                            </Stack>

                            <Stack
                                h='79%'
                                spacing={'50px'}
                                alignItems={'center'}
                                justifyContent='flex-start'>
                                <Menu>
                                    <MenuButton>
                                        <SelectorDropDown
                                            direction='row'
                                            className='month'>
                                            <Box
                                                w='70%'
                                                className='selector_text'>
                                                <Text>
                                                    {pieDateType === 'Monthly'
                                                        ? 'Monthly'
                                                        : pieDateType}
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
                                                setPieDateType(() => 'Monthly')
                                            }>
                                            Monthly
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setPieDateType(() => 'Weekly')
                                            }>
                                            Weekly
                                        </MenuItem>
                                    </MenuList>
                                </Menu>

                                <Stack className='glegend' spacing='20px'>
                                    <LegendCardWrap h='56px'>
                                        <Stack
                                            direction='row'
                                            alignItems={'center'}>
                                            <Box
                                                className='colordiv'
                                                bg='#E5665E'
                                            />
                                            <Text className='legendCard_text'>
                                                Blood Pressure
                                            </Text>
                                        </Stack>
                                        <Text className='legendCard_fig'>
                                            {dashboardPieReports.BloodPReports}%
                                        </Text>
                                    </LegendCardWrap>
                                    <LegendCardWrap h='56px'>
                                        <Stack
                                            direction='row'
                                            alignItems={'center'}>
                                            <Box
                                                className='colordiv'
                                                bg='#47ca8a'
                                            />{' '}
                                            <Text className='legendCard_text'>
                                                Blood Sugar
                                            </Text>
                                        </Stack>
                                        <Text className='legendCard_fig'>
                                            {dashboardPieReports.BloodSReports}%
                                        </Text>
                                    </LegendCardWrap>
                                    <LegendCardWrap h='56px'>
                                        <Stack
                                            direction='row'
                                            alignItems={'center'}>
                                            <Box
                                                className='colordiv'
                                                bg='#9747ff'
                                            />{' '}
                                            <Text className='legendCard_text'>
                                                Fitness
                                            </Text>
                                        </Stack>
                                        <Text className='legendCard_fig'>
                                            {dashboardPieReports.FitnessReports}
                                            %
                                        </Text>
                                    </LegendCardWrap>
                                </Stack>
                            </Stack>
                        </PieStatWrapper>
                    </Stack>

                    {/** second section */}
                    <Stack
                        w='100%'
                        position='relative'
                        h='358px'
                        bg='#ffffff'
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={'8.87px'}>
                        <Stack
                            direction='row'
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            w='90%'
                            h='90%'>
                            <BarGraphWrapper
                                pt='10px'
                                w='70%'
                                h='inherit'
                                justifyContent={'center'}
                                alignItems='center'>
                                <Stack
                                    width='90%'
                                    direction='row'
                                    alignItems={'center'}
                                    justifyContent='space-between'>
                                    <Box className='barTitle'>
                                        <Text>Average New Patients</Text>
                                    </Box>

                                    <Menu>
                                        <MenuButton>
                                            <SelectorDropDown
                                                direction='row'
                                                className='month'>
                                                <Box
                                                    w='70%'
                                                    className='selector_text'>
                                                    <Text>
                                                        {barDateType ===
                                                        'Monthly'
                                                            ? barDateType
                                                            : barDateType}
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
                                                    setBarDateType(
                                                        () => 'Monthly'
                                                    )
                                                }>
                                                Monthly
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setBarDateType(
                                                        () => 'Weekly'
                                                    )
                                                }>
                                                Weekly
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Stack>

                                <Stack w='100%' h='inherit'>
                                    <VictoryChart
                                        width={700}
                                        containerComponent={
                                            <VictoryContainer
                                                responsive={true}
                                            />
                                        }
                                        domainPadding={{ x: 15 }}>
                                        <VictoryBar
                                            barWidth={30}
                                            style={{
                                                data: {
                                                    fill: '#e1e4e8',
                                                },
                                            }}
                                            data={barData}
                                            alignment='middle'
                                        />
                                        <VictoryAxis
                                            style={{
                                                axis: {
                                                    stroke: '#756f6a',
                                                    display: 'none',
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
                                                    stroke: '#756f6a',
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
                            </BarGraphWrapper>

                            <BarStatCard
                                justifyContent={'space-between'}
                                padding='20px'>
                                <Box className='bstat_icon'>
                                    <Icon
                                        icon='healthicons:people'
                                        color='#46cf8d'
                                        width={30}
                                    />
                                </Box>

                                <Box>
                                    <Stack spacing={'22px'}>
                                        <Text className='bstat_title'>
                                            This Month
                                        </Text>

                                        <Stack
                                            spacing={'18px'}
                                            direction='row'
                                            alignItems={'center'}>
                                            <Text className='bstat_val'>
                                                {
                                                    dashboardBarReports.CurrentTotal
                                                }
                                            </Text>

                                            <Text
                                                className={`bstat_percent ${
                                                    dashboardBarReports.PatientPercent <
                                                    0
                                                        ? 'decline'
                                                        : 'rise'
                                                }`}>
                                                {
                                                    dashboardBarReports.PatientPercent
                                                }
                                                %
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </BarStatCard>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Overview

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

const ListStatWrapper = styled(Stack)`
    background: #ffffff;

    width: 100%;
    border-radius: 10px;
    padding: 27px 25px;
`

const ListStatContainer = styled(Stack)`
    width: 50%;
    height: 180px;
    background: #fff;
    border: 1.10975px solid rgba(0, 0, 0, 0.05);
    border-radius: 8.87803px;

    .lstat_icon {
        width: 47.72px;
        height: 47.72px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 26.7164px;
        background: #ffffff;
    }

    .lstat_title {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        width: 85px;
        color: #000000;
    }

    .lstat_val {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        line-height: 25px;
        color: #000000;
    }

    .lstat_duration {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 16px;
        color: #616569;
    }
`

const PieStatWrapper = styled(Stack)`
    height: 429px;
    background: #ffffff;
    border-radius: 10px;
    align-items: center;
    .piechart {
        align-items: center;
        justify-content: center;
    }

    .piechart {
        p {
            font-family: 'Roboto', sans-serif;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            color: #000000;
        }
    }
    svg {
        width: 100%;
        height: 100%;
    }

    .pieChartPie {
        width: 100%;
        height: 100%;
    }

    .month {
        width: 114px;
        height: 32px;
        background: #ffffff;
    }

    .glegend {
        width: 132px;
        height: 208px;
        background: #ffffff;
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

const LegendCardWrap = styled(Stack)`
    justify-content: space-between;
    .colordiv {
        width: 16px;
        height: 16px;
        border-radius: 4px;
    }

    .legendCard_text {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #92979d;
    }

    .legendCard_fig {
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 26px;
        line-height: 30px;
        color: #000000;
        padding-left: 20px;
    }
`

const BarGraphWrapper = styled(Stack)`
    .barTitle {
        font-family: 'Roboto', sans-serif !important;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        color: #000000;
    }
`

const BarStatCard = styled(Stack)`
    width: 193px;
    height: 273px;
    border: 1.10975px solid rgba(0, 0, 0, 0.1);
    border-radius: 8.87803px;

    .bstat_icon {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 31.3524px;
        background: #e4f9e9;
    }

    .bstat_title {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 21px;
        color: #92979d;
    }

    .bstat_val {
        display: flex;
        justify-content: center;
        align-items: center;

        color: #000000;
        font-weight: 500;
        font-size: 35px;
        line-height: 25px;
    }

    .bstat_percent {
        width: 62px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #b4292a;
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.75),
                rgba(255, 255, 255, 0.75)
            ),
            #f03738;
        border-radius: 24px;
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
