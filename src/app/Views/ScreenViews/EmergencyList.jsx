import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Checkbox,
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
import { useNavigate } from 'react-router-dom'

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
        title: 'userID',
    },
    {
        title: 'Patient Name',
    },
    {
        title: 'Emergency Comment',
    },

    {
        title: 'Health Vital (Value)',
    },
    {
        title: 'Status',
    },
    {
        title: 'Phone Number',
    },
]

const searchData = []
const projectTagData = []
const exportData = []
const allDisplayData = [
    {
        _id: 1,
        patientId: '8HI00122',
        patientName: 'Maritza Mertz',
        phoneNumber: '+254114 635982',
        height: `5’6”`,
        weight: ' 36kg',
        platform: 'Android',
        dateJoined: '30/12/2021',
    },
    {
        _id: 2,
        patientId: '8HI00122',
        patientName: 'Maritza Mertz',
        phoneNumber: '+254114 635982',
        height: `5’6”`,
        weight: ' 36kg',
        platform: 'Android',
        dateJoined: '30/12/2021',
    },
    {
        _id: 3,
        patientId: '8HI00122',
        patientName: 'Maritza Mertz',
        phoneNumber: '+254114 635982',
        height: `5’6”`,
        weight: ' 36kg',
        platform: 'Android',
        dateJoined: '30/12/2021',
    },
]

const allNewDisplayData = [
    {
        _id: 1,
        dateMeasured: '15 May 2020 9:30 am',
        healthType: 'Blood glucose lvl.',
        healthVital: 'Avg.BS (2.3 mg/dl)',
        status: 'Critical Low',
    },
    {
        _id: 2,
        dateMeasured: '15 May 2020 9:30 am',
        healthType: 'Blood glucose lvl.',
        healthVital: 'Avg.BS (2.3 mg/dl)',
        status: 'Critical Low',
    },
    {
        _id: 3,
        dateMeasured: '15 May 2020 9:30 am',
        healthType: 'Fitness Activity',
        healthVital: 'Swimming (39mins)',
        status: '-',
    },
    {
        _id: 4,
        dateMeasured: '15 May 2020 9:30 am',
        healthType: 'Blood pressure lvl.',
        healthVital: 'Avg.BP (123/75mm/Hg)',
        status: 'Normal',
    },
]

const allNewDisplayData2 = [
    {
        _id: 1,
        patientId: '8HI00122',
        patientName: 'Maritza Mertz',
        emergencyComment: 'Blood glucose lvl.',
        healthType: 'Blood glucose lvl.',
        healthVital: 'Avg.BS (2.3 mg/dl)',
        status: 'Critical Low',
        phoneNumber: '+254114635982',
    },
    {
        _id: 2,
        patientId: '8HI00122',
        patientName: 'Maritza Mertz',
        emergencyComment: 'Blood glucose lvl.',
        healthType: 'Blood glucose lvl.',
        healthVital: 'Avg.BS (2.3 mg/dl)',
        status: 'Critical Low',
        phoneNumber: '+254114635982',
    },
    {
        _id: 3,
        patientId: '8HI00122',
        patientName: 'Maritza Mertz',
        emergencyComment: 'Blood glucose lvl.',
        healthType: 'Blood glucose lvl.',
        healthVital: 'Avg.BS (2.3 mg/dl)',
        status: '-',
        phoneNumber: '+254114635982',
    },
    {
        _id: 4,
        patientId: '8HI00122',
        patientName: 'Maritza Mertz',
        emergencyComment: 'Blood glucose lvl.',
        healthType: 'Blood pressure lvl.',
        healthVital: 'Avg.BP (123/75mm/Hg)',
        status: 'Normal',
        phoneNumber: '+254114635982',
    },
]

const EmergencyList = () => {
    let routeNavigate = useNavigate()
    const [searchActive, setSearchActive] = React.useState(false)
    const handleSearchInput = () => {}
    const handlePrev = () => {}
    const handleNext = () => {}

    let PaginationFirstNumber =
        allDisplayData.currentPage * allDisplayData.itemsPerPage -
        allDisplayData.itemsPerPage +
        1

    let PaginationLastNumber =
        PaginationFirstNumber + allDisplayData.totalItemsDisplayed - 1

    /** searched Pagination */
    let PaginationSFirstNumber =
        searchData.currentPage * searchData.itemsPerPage -
        searchData.itemsPerPage +
        1
    let PaginationSLastNumber =
        PaginationSFirstNumber + searchData.totalItemsDisplayed - 1
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
                    <SearchContainer>
                        <InputGroup>
                            <InputLeftElement
                                h='35px'
                                children={
                                    <Icon
                                        icon='ic:outline-search'
                                        color='#92979d'
                                        width='20'
                                        height='20'
                                    />
                                }
                            />
                            <Input
                                h='35px'
                                type='text'
                                value={''}
                                bg={'#f0f2f3'}
                                placeholder='Search...'
                                minW={{
                                    base: '40px',
                                    xl: '360px',
                                }}
                                onChange={handleSearchInput}
                            />
                        </InputGroup>
                    </SearchContainer>

                    {/** third section - recent vitals */}

                    <Stack spacing='25px'>
                        {/** table title */}
                        <TableHeadWrapper direction='row'>
                            <Stack>
                                <Text className='tablehead_text'>
                                    Emergency
                                </Text>
                                <Text className='tablehead_subtext'>
                                    Patients that need to be reviewed or
                                    contacted.
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
                        <Stack spacing='7px'>
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
                                        {allNewDisplayData2.length > 0 ? (
                                            <>
                                                {allNewDisplayData2.map(
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
                                                                        data.patientId
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
                                                                        data.patientName
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    {
                                                                        data.emergencyComment
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

                                                                <Td
                                                                    maxW='250px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                    }}>
                                                                    {
                                                                        data.phoneNumber
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
                                        {`${1}`} - {`${20}`} of {`${6}`}
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
                                        <span>{'20'}</span>
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
                                                    width='20'
                                                    height='20'
                                                />
                                            </Box>
                                        </Box>
                                        <Box>
                                            {' '}
                                            {'2'}/{'3'}
                                        </Box>
                                        <Box
                                            className='right'
                                            onClick={handleNext}>
                                            <Box>
                                                <Icon
                                                    icon='material-symbols:arrow-forward'
                                                    color='#616569'
                                                    width='20'
                                                    height='20'
                                                />
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </PaginationStack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default EmergencyList

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

const SearchContainer = styled(Stack)``

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

const NewButton = styled(Button)`
    background: #3e66fb !important;
    border-radius: 8px !important;
    font-family: 'Open Sans', sans-serif !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 16px;
    color: #ffffff;
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
