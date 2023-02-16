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

import { Icon } from '@iconify/react'
import '@fontsource/open-sans'
import '@fontsource/roboto'
import { useParams } from 'react-router-dom'
import {
    GetIndividualVitalSummary,
    GetIndividualPatient,
    reset,
} from '../../store/features/patients/patientSlice'
import { useDispatch, useSelector } from 'react-redux'

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

const ViewPatientVitals = () => {
    let params = useParams()
    let toast = useToast()
    let dispatch = useDispatch()

    // eslint-disable-next-line no-unused-vars
    const [perPage, setPerPage] = React.useState(10)
    const [allDisplayData, setAllDisplayData] = React.useState({
        items: [],
        allItems: [],
        currentPage: 1,
        itemsPerPage: 8,
        totalItemsDisplayed: 0,
        totalAllItems: 0,
        totalPages: 0,
    })

    React.useEffect(() => {
        dispatch(GetIndividualVitalSummary(params))
        dispatch(GetIndividualPatient(params))
    }, [params, dispatch])

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

    //paginate the all items
    React.useEffect(() => {
        let allQueriedItems = individualPatient.vitals.filter((data) => {
            return data
        })

        const allItemsCollected = allQueriedItems

        const totalItems = allQueriedItems.length
        let itemsPerPage = perPage

        const currentPage = allDisplayData.currentPage
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage

        const currentItems = allItemsCollected.slice(
            indexOfFirstItem,
            indexOfLastItem
        )

        const pageLength = Math.ceil(totalItems / itemsPerPage)

        setAllDisplayData({
            items: currentItems,
            allItems: allQueriedItems,
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            totalItemsDisplayed: currentItems.length,
            totalAllItems: allQueriedItems.length,
            totalPages: pageLength,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [individualPatient.vitals])

    const handlePrev = () => {
        if (allDisplayData.currentPage - 1 >= 1) {
            let page = allDisplayData.currentPage - 1
            const indexOfLastItem = page * allDisplayData.itemsPerPage
            const indexOfFirstItem =
                indexOfLastItem - allDisplayData.itemsPerPage

            const currentItems = allDisplayData.allItems.slice(
                indexOfFirstItem,
                indexOfLastItem
            )

            setAllDisplayData({
                ...allDisplayData,
                currentPage: page,
                itemsPerPage: perPage,
                items: currentItems,
                totalItemsDisplayed: currentItems.length,
            })
        }
    }
    const handleNext = () => {
        if (allDisplayData.currentPage + 1 <= allDisplayData.totalPages) {
            let page = allDisplayData.currentPage + 1
            const indexOfLastItem = page * allDisplayData.itemsPerPage
            const indexOfFirstItem =
                indexOfLastItem - allDisplayData.itemsPerPage

            const currentItems = allDisplayData.allItems.slice(
                indexOfFirstItem,
                indexOfLastItem
            )

            setAllDisplayData({
                ...allDisplayData,
                currentPage: page,
                itemsPerPage: perPage,
                items: currentItems,
                totalItemsDisplayed: currentItems.length,
            })
        }
    }

    let PaginationFirstNumber =
        allDisplayData.currentPage * allDisplayData.itemsPerPage -
        allDisplayData.itemsPerPage +
        1

    let PaginationLastNumber =
        PaginationFirstNumber + allDisplayData.totalItemsDisplayed - 1

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
                                color='#92979d'
                                hFlip={true}
                                vFlip={true}
                                width={'12'}
                            />
                        </Box>
                        <Text>
                            Patient ID -{' '}
                            {individualPatient.patient !== null
                                ? individualPatient.patient.patientId
                                : ''}
                        </Text>
                        <Box>
                            <Icon
                                icon='material-symbols:arrow-back-ios-new'
                                color='#3e66fb'
                                hFlip={true}
                                vFlip={true}
                                width={'12'}
                            />
                        </Box>
                        <Text className='current'>vitals</Text>
                    </LinkToolsWrap>

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
                                <SelectorDropDown
                                    direction='row'
                                    className='month'>
                                    <Box w='70%' className='selector_text'>
                                        <Text>Monthly</Text>
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
                        <Stack direction='row' alignItems='center'>
                            <SummaryContainer spacing='10px'>
                                <Text className='sum_text'>
                                    Before Breakfast
                                </Text>
                                <Text className='sum_fig'>
                                    {' '}
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
                                    {' '}
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
                                    All Vitals
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
                                        <Text>Health Type</Text>
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
                        <Stack spacing='7px'>
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
                                                                        data.dateMeasured
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

                            {/** pagination */}
                            {allDisplayData.items.length > 0 && (
                                <PaginationStack
                                    direction='row'
                                    w='100%'
                                    height='56px'
                                    alignItems='center'
                                    justifyContent={'space-between'}>
                                    <Stack
                                        w='20%'
                                        direction='row'
                                        className='pages'>
                                        <Text>Displaying</Text>
                                        <Text>
                                            {`${PaginationFirstNumber}`} -{' '}
                                            {`${PaginationLastNumber}`} of{' '}
                                            {`${allDisplayData.totalAllItems}`}
                                        </Text>
                                    </Stack>
                                    <Stack
                                        w='80%'
                                        h='90%'
                                        direction='row'
                                        spacing='20px'
                                        alignItems='center'
                                        className='pagination'>
                                        <Box className='rows'>
                                            <h1>Rows per page:</h1>
                                            <span>
                                                {' '}
                                                {allDisplayData.itemsPerPage}
                                            </span>
                                        </Box>

                                        {/** pagination arrows */}
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            className='arrows'>
                                            <Box
                                                className='left'
                                                onClick={handlePrev}>
                                                <Box>
                                                    <Icon
                                                        icon='material-symbols:arrow-back'
                                                        color='#616569'
                                                        width='16'
                                                        height='20'
                                                    />
                                                </Box>
                                            </Box>
                                            <Box>
                                                {' '}
                                                {allDisplayData.currentPage}/
                                                {allDisplayData.totalPages}
                                            </Box>
                                            <Box
                                                className='right'
                                                onClick={handleNext}>
                                                <Box>
                                                    <Icon
                                                        icon='material-symbols:arrow-forward'
                                                        color='#616569'
                                                        width='16'
                                                        height='20'
                                                    />
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </PaginationStack>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default ViewPatientVitals

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

const PaginationStack = styled(Stack)`
    width: 100%;
    padding: 0 10px;
    .pagination {
        color: #6b7280;
        align-items: center;
        justify-content: flex-end;

        background: transparent;
    }
    .pages {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 166%;
        color: #111827;
    }

    .rows {
        display: flex;
        align-items: center;
        h1 {
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 166%;
        }
        span {
            margin-left: 2px;
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 19px;

            letter-spacing: 0.3px;
            color: #111827;
        }
    }

    .arrows {
        width: 88px;
        display: flex;
        justify-content: space-between;

        .left,
        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
            border-radius: 6px;
        }
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
