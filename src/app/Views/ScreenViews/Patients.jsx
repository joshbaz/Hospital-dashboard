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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useToast,
} from '@chakra-ui/react'
import styled from 'styled-components'
import TopBar from '../../../components/common/Navigation/TopBar'
import Navigation from '../../../components/common/Navigation/Navigation'

import { Icon } from '@iconify/react'
import '@fontsource/open-sans'
import '@fontsource/roboto'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import {
    GetAllPatients,
    CreatePatient,
    reset,
} from '../../store/features/patients/patientSlice'

const TableHeadData = [
    {
        title: 'Patient ID',
    },
    {
        title: 'Patient Name',
    },
    {
        title: 'Phone Number',
    },
    {
        title: 'Height & Weight',
    },

    {
        title: 'Platform',
    },
    {
        title: 'Date Joined',
    },
    {
        title: '',
    },
]

const searchData = []
const projectTagData = []
const exportData = []
const allDisplayData2 = [
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

const Patients = () => {
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let toast = useToast()
    const [searchActive, setSearchActive] = React.useState(false)
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [createPatient, setCreatePatient] = React.useState(false)
    const [perPage, setPerPage] = React.useState(10)
    const [searchValue, setSearchValue] = React.useState('')
    const [allDisplayData, setAllDisplayData] = React.useState({
        items: [],
        allItems: [],
        currentPage: 1,
        itemsPerPage: 8,
        totalItemsDisplayed: 0,
        totalAllItems: 0,
        totalPages: 0,
    })

    const [searchData, setSearchData] = React.useState({
        items: [],
        allItems: [],
        currentPage: 1,
        itemsPerPage: 8,
        totalItemsDisplayed: 0,
        totalAllItems: 0,
        totalPages: 0,
    })
    //validation schema
    const validationSchema = yup.object().shape({
        patientName: yup.string().required('name is required'),
        phoneNumber: yup.string().required('phoneNumber is required'),
        birthday: yup.string().required('birthday is required'),
    })

    const { isError, isSuccess, message, allItems } = useSelector(
        (state) => state.patient
    )

    const cancelSubmissionUpload = () => {
        setCreatePatient(() => false)
    }

    React.useEffect(() => {
        dispatch(GetAllPatients())
    }, [])

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

    //paginate the all items
    React.useEffect(() => {
        let allQueriedItems = allItems.items.filter((data) => {
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
    }, [allItems])

    /** paginate search */
    React.useEffect(() => {
        const searchResults = allDisplayData.allItems.filter((data) => {
            let serachedValue = searchValue
                ? searchValue.toLowerCase()
                : searchValue
            let name = data.patientName.toLowerCase()
            let patientId = data.patientId.toLowerCase()
            if (name.includes(serachedValue)) {
                return data
            } else if (patientId.includes(serachedValue)) {
                return data
            } else {
            }
        })

        const allItemsCollected = searchResults

        const totalItems = searchResults.length

        let itemsPerPage = perPage

        const currentPage = searchData.currentPage

        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage

        const currentItems = allItemsCollected.slice(
            indexOfFirstItem,
            indexOfLastItem
        )

        const pageLength = Math.ceil(totalItems / itemsPerPage)

        setSearchData({
            items: currentItems,
            allItems: searchResults,
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            totalItemsDisplayed: currentItems.length,
            totalAllItems: searchResults.length,
            totalPages: pageLength,
        })
    }, [searchValue])

    //handle previous button
    const handlePrev = () => {
        if (searchActive) {
            if (searchData.currentPage - 1 >= 1) {
                let page = searchData.currentPage - 1
                const indexOfLastItem = page * searchData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - searchData.itemsPerPage

                const currentItems = searchData.allItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setSearchData({
                    ...searchData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                })
            }
        } else {
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
    }
    //handle next button
    const handleNext = () => {
        if (searchActive) {
            if (searchData.currentPage + 1 <= searchData.totalPages) {
                let page = searchData.currentPage + 1
                const indexOfLastItem = page * searchData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - searchData.itemsPerPage

                const currentItems = searchData.allItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setSearchData({
                    ...searchData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                })
            }
        } else {
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
    }

    /** handle search input */
    const handleSearchInput = (e) => {
        console.log(e.target.value, 'values')

        setSearchValue(() => e.target.value)

        if (e.target.value) {
            setSearchActive(() => true)
        } else {
            setSearchActive(() => false)
        }
    }
    //pages
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

                <Stack h='100%' p='0 30px' spacing='20px'>
                    {/** first section */}
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
                                value={searchValue}
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

                    {/** second section */}

                    <Stack spacing='25px'>
                        {/** table title */}
                        <TableHeadWrapper direction='row'>
                            <Stack>
                                <Text className='tablehead_text'>
                                    Patient List
                                </Text>
                                <Text className='tablehead_subtext'>
                                    This is a list of all Users
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

                                <NewButton
                                    onClick={() =>
                                        setCreatePatient(() => true)
                                    }>
                                    Create New Patient
                                </NewButton>
                            </Stack>
                        </TableHeadWrapper>

                        {/** table */}
                        <Stack>
                            <TableContainer>
                                <Table size='sm'>
                                    <Thead>
                                        <Tr>
                                            {TableHeadData.map(
                                                (data, index) => {
                                                    return (
                                                        <Th
                                                            key={index}
                                                            className='table_head'>
                                                            <Stack
                                                                direction='row'
                                                                alignItems={
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

                                    {searchActive ? (
                                        <Tbody>
                                            {searchData.items.length > 0 ? (
                                                <>
                                                    {searchData.items.map(
                                                        (data, index) => {
                                                            return (
                                                                <Tr
                                                                    className={`table_row `}
                                                                    key={
                                                                        data._id
                                                                    }>
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
                                                                            data.phoneNumber
                                                                        }
                                                                    </Td>

                                                                    <Td
                                                                        maxW='250px'
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            color: '#15151D',
                                                                        }}>
                                                                        {
                                                                            data.height
                                                                        }{' '}
                                                                        {
                                                                            data.weight
                                                                        }
                                                                    </Td>
                                                                    <Td
                                                                        maxW='250px'
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            color: '#15151D',
                                                                        }}>
                                                                        {
                                                                            data.platform
                                                                        }
                                                                    </Td>
                                                                    <Td
                                                                        maxW='250px'
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            color: '#15151D',
                                                                        }}>
                                                                        {
                                                                            data.dateJoined
                                                                        }
                                                                    </Td>
                                                                    <Td>
                                                                        <ViewButton
                                                                            onClick={() =>
                                                                                routeNavigate(
                                                                                    `/patientdatabase/view/${data._id}`
                                                                                )
                                                                            }
                                                                            direction='row'
                                                                            className='month'>
                                                                            <Box
                                                                                w='70%'
                                                                                className='viewbutton_text'>
                                                                                <Text>
                                                                                    View
                                                                                    Details
                                                                                </Text>
                                                                            </Box>

                                                                            <Box
                                                                                w='30%'
                                                                                className='viewbutton_icon'>
                                                                                <Box>
                                                                                    <Icon
                                                                                        icon='material-symbols:arrow-forward'
                                                                                        color='#3e66fb'
                                                                                        width='24'
                                                                                        height='24'
                                                                                    />
                                                                                </Box>
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
                                    ) : (
                                        <Tbody>
                                            {allDisplayData.items.length > 0 ? (
                                                <>
                                                    {allDisplayData.items.map(
                                                        (data, index) => {
                                                            return (
                                                                <Tr
                                                                    className={`table_row `}
                                                                    key={
                                                                        data._id
                                                                    }>
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
                                                                            data.phoneNumber
                                                                        }
                                                                    </Td>

                                                                    <Td
                                                                        maxW='250px'
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            color: '#15151D',
                                                                        }}>
                                                                        {
                                                                            data.height
                                                                        }{' '}
                                                                        {
                                                                            data.weight
                                                                        }
                                                                    </Td>
                                                                    <Td
                                                                        maxW='250px'
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            color: '#15151D',
                                                                        }}>
                                                                        {
                                                                            data.platform
                                                                        }
                                                                    </Td>
                                                                    <Td
                                                                        maxW='250px'
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            color: '#15151D',
                                                                        }}>
                                                                        {
                                                                            data.dateJoined
                                                                        }
                                                                    </Td>
                                                                    <Td>
                                                                        <ViewButton
                                                                            onClick={() =>
                                                                                routeNavigate(
                                                                                    `/patientdatabase/view/${data._id}`
                                                                                )
                                                                            }
                                                                            direction='row'
                                                                            className='month'>
                                                                            <Box
                                                                                w='70%'
                                                                                className='viewbutton_text'>
                                                                                <Text>
                                                                                    View
                                                                                    Details
                                                                                </Text>
                                                                            </Box>

                                                                            <Box
                                                                                w='30%'
                                                                                className='viewbutton_icon'>
                                                                                <Box>
                                                                                    <Icon
                                                                                        icon='material-symbols:arrow-forward'
                                                                                        color='#3e66fb'
                                                                                        width='24'
                                                                                        height='24'
                                                                                    />
                                                                                </Box>
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
                                    )}
                                </Table>
                            </TableContainer>

                            {/** pagination */}
                            {searchActive ? (
                                <Box>
                                    {' '}
                                    {searchData.items.length > 0 && (
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
                                                    {`${PaginationSFirstNumber}`}{' '}
                                                    -{' '}
                                                    {`${PaginationSLastNumber}`}{' '}
                                                    of{' '}
                                                    {`${searchData.totalAllItems}`}
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
                                                        {
                                                            searchData.itemsPerPage
                                                        }
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
                                                        {searchData.currentPage}
                                                        /{searchData.totalPages}
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
                                </Box>
                            ) : (
                                <Box>
                                    {' '}
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
                                                    {`${PaginationFirstNumber}`}{' '}
                                                    -{' '}
                                                    {`${PaginationLastNumber}`}{' '}
                                                    of{' '}
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
                                                        {
                                                            allDisplayData.itemsPerPage
                                                        }
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
                                                        {
                                                            allDisplayData.currentPage
                                                        }
                                                        /
                                                        {
                                                            allDisplayData.totalPages
                                                        }
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
                                </Box>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            {/** creation modal */}
            <Modal
                size=''
                isOpen={createPatient}
                p='0'
                w=''
                onClose={() => cancelSubmissionUpload()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' w='50%'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={{
                                patientName: '',
                                phoneNumber: '',
                                birthday: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                dispatch(CreatePatient(values))
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
                                                    <h1>Create New Patient</h1>
                                                </Box>
                                            </Stack>

                                            <Stack
                                                p='10px 20px 10px 20px'
                                                spacing='20px'>
                                                <Text className='form_head'>
                                                    details
                                                </Text>

                                                <Stack
                                                    spacing={'40px'}
                                                    direction='row'
                                                    w='100%'>
                                                    {/** registration type && date */}
                                                    <Stack
                                                        className='content'
                                                        direction='column'
                                                        w='100%'>
                                                        <Stack
                                                            direction='column'
                                                            spacing='11px'>
                                                            <Box className='content_title'>
                                                                Full Name
                                                            </Box>

                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Input
                                                                    bg='#ffffff'
                                                                    placeholder='Insert patient name'
                                                                    size='md'
                                                                    type='text'
                                                                    name='patientName'
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.patientName
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.patientName ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.patientName
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>
                                                        <Stack
                                                            direction='column'
                                                            spacing='11px'>
                                                            <Box className='content_title'>
                                                                Phone Number
                                                            </Box>

                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Input
                                                                    bg='#ffffff'
                                                                    placeholder='Insert patient phone number'
                                                                    size='md'
                                                                    type='text'
                                                                    name='phoneNumber'
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.phoneNumber
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.phoneNumber ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.phoneNumber
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>
                                                        <Stack
                                                            direction='column'
                                                            spacing='11px'>
                                                            <Box className='content_title'>
                                                                Birthday
                                                            </Box>

                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Input
                                                                    bg='#ffffff'
                                                                    placeholder='Select Date and Time'
                                                                    size='md'
                                                                    type='date'
                                                                    name='birthday'
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.birthday
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.birthday ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.birthday
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
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
                                                    cancelSubmissionUpload()
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

export default Patients

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

    .pdf {
        background: #fceded;
        color: #f14c54;
    }

    .doc {
        color: #faa723;
        background: #feecd0;
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

const ErrorMsg = styled(Text)`
    font-size: 13px;
    line-height: 20px;
    padding: 5px 10px;
    color: #f14c54;

    .filesError {
        padding: 0;
    }
`
