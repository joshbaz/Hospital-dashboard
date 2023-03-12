/* eslint-disable array-callback-return */
import React from 'react'
import {
    Box,
    Stack,
    Text,
    Button,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Input,
    Switch,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import styled from 'styled-components'
import TopBar from '../../../components/common/Navigation/TopBar'
import Navigation from '../../../components/common/Navigation/Navigation'
import moment from 'moment-timezone'
import { Icon } from '@iconify/react'
import '@fontsource/open-sans'
import '@fontsource/roboto'
import { useParams } from 'react-router-dom'
import {
    GetIndividualPrescriptionSummary,
    GetIndividualPatient,
    CreatePrescription,
    EditPrescription,
    CreateRefill,
    reset,
} from '../../store/features/patients/patientSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
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
        title: 'PscbID',
    },
    {
        title: 'Drug',
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
        title: 'Refill',
    },
    {
        title: '',
    },
    {
        title: '',
    },
]

const ViewPatientPrescription = () => {
    let params = useParams()
    let toast = useToast()
    let dispatch = useDispatch()
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [isSubmittingp1, setIsSubmittingp1] = React.useState(false)
    const [isSubmittingp2, setIsSubmittingp2] = React.useState(false)
    const [createPrescription, setCreatePrescription] = React.useState(false)
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
    const [ppDateType, setPPDateType] = React.useState('Monthly')
    const [Statuses, setStatuses] = React.useState('')
    const [prescriptionEditDetails, setPrescriptionEditDetails] =
        React.useState(null)
    const [EditDetails, setEditDetails] = React.useState(false)

    //refill request
    const [refillModal, setRefillModal] = React.useState(false)
    const [refillDetails, setRefillDetails] = React.useState(null)
    const activateRefill = (data) => {
        setRefillDetails(() => data)
        setRefillModal(() => true)
    }
    const cancelRefillUpload = () => {
        setRefillDetails(() => null)
        setRefillModal(() => false)
    }

    const activateEditDetails = (data) => {
        setPrescriptionEditDetails(() => data)
        setEditDetails(() => true)
    }

    const cancelEditUpload = () => {
        setPrescriptionEditDetails(() => null)
        setEditDetails(() => false)
    }
    const cancelSubmissionUpload = () => {
        setCreatePrescription(() => false)
    }

    //validation schema
    const validationSchema = yup.object().shape({
        drugName: yup.string().required('name is required'),
        genericName: yup.string().required('name is required'),
        drugclass: yup.string().required('class is required'),
        prescribed: yup.string().required('prescription is required'),
    })

    //validation schema
    const validationSchemaRefill = yup.object().shape({
        id: yup.string().required('id is required'),
        pcbId: yup.string().required('required'),
    })

    React.useEffect(() => {
        Cookies.set('ppDatetype', ppDateType)
    }, [ppDateType])

    React.useEffect(() => {
        socket.on('update-prescription', (data) => {
            if (
                data.actions === 'request-prescription-pull' &&
                data.data === params.id
            ) {
                dispatch(GetIndividualPrescriptionSummary(params))
                dispatch(GetIndividualPatient(params))
            }
        })

        return () => {
            socket.off('update-prescription')
            //socket.disconnect()
            //LocalSockets.removeAllListeners('update-dash-vitals')

            // io.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, socket])

    React.useEffect(() => {
        dispatch(GetIndividualPrescriptionSummary(params))
        dispatch(GetIndividualPatient(params))
    }, [params, dispatch, ppDateType])

    const {
        isError,
        isSuccess,
        message,

        individualPatient,
        individualPrescriptionSummary,
    } = useSelector((state) => state.patient)

    React.useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
                setHelperFunctions(() => null)
                toast({
                    position: 'top',
                    title: message,
                    status: 'error',
                    duration: 10000,
                    isClosable: true,
                })
                setIsSubmittingp(false)
                dispatch(reset())
            } else {
                toast({
                    position: 'top',
                    title: message,
                    status: 'error',
                    duration: 10000,
                    isClosable: true,
                })
                setIsSubmittingp(false)
                dispatch(reset())
            }
        }

        if (isSuccess && message) {
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
                setHelperFunctions(() => null)
                setIsSubmittingp(() => false)
                setIsSubmittingp1(() => false)
                setIsSubmittingp2(() => false)
                setRefillModal(() => false)
                setRefillModal(() => false)
                setEditDetails(() => false)
                setPrescriptionEditDetails(() => null)
                // setEditDetails(() => false)
                dispatch(reset())
            }
            setIsSubmittingp(() => false)
            dispatch(reset())
        }

        dispatch(reset())
        //setIsSubmittingp2(() => false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, message])

    //paginate the all items
    React.useEffect(() => {
        let allQueriedItems = []

        allQueriedItems = individualPatient.prescription.filter((data) => {
            if (Statuses === '') {
                return data
            } else {
                if (data.status === Statuses) {
                    return data
                }
            }
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
    }, [individualPatient.prescription, Statuses])

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
                <Box w='100%' h='65px' className='stick' zIndex={'20'}>
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
                        <Text className='current'>Prescriptions</Text>
                    </LinkToolsWrap>

                    {/** second section  - vitals summary*/}
                    <Stack spacing='25px'>
                        {/** table title */}
                        <TableHeadWrapper direction='row'>
                            <Stack>
                                <Text className='tablehead_text'>
                                    Prescriptions Summary
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
                                                    {ppDateType === 'Monthly'
                                                        ? 'Monthly'
                                                        : ppDateType}
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
                                                setPPDateType(() => 'Monthly')
                                            }>
                                            Monthly
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setPPDateType(() => 'Weekly')
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
                                    Active Prescriptions
                                </Text>
                                <Text className='sum_fig'>
                                    {' '}
                                    {
                                        individualPrescriptionSummary.ActivePrescription
                                    }
                                </Text>
                                <Text
                                    className={`sum_percent ${
                                        individualPrescriptionSummary.activePrescription_Percent <
                                        0
                                            ? 'decline'
                                            : 'rise'
                                    }`}>
                                    {' '}
                                    {
                                        individualPrescriptionSummary.activePrescription_Percent
                                    }
                                    %
                                </Text>
                            </SummaryContainer>
                            <SummaryContainer spacing='10px'>
                                <Text className='sum_text'>Refill Request</Text>
                                <Text className='sum_fig'>
                                    {' '}
                                    {
                                        individualPrescriptionSummary.RefillRequests
                                    }
                                </Text>
                                <Text
                                    className={`sum_percent ${
                                        individualPrescriptionSummary.refillRequests_Percent <
                                        0
                                            ? 'decline'
                                            : 'rise'
                                    }`}>
                                    {
                                        individualPrescriptionSummary.refillRequests_Percent
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
                                    Prescriptions List
                                </Text>
                                <Text className='tablehead_subtext'>
                                    All drugs that have recently been updated.
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
                                                setStatuses(() => 'active')
                                            }>
                                            Active
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setStatuses(() => 'inactive')
                                            }>
                                            Inactive
                                        </MenuItem>
                                    </MenuList>
                                </Menu>

                                <NewButton
                                    onClick={() =>
                                        setCreatePrescription(() => true)
                                    }>
                                    Add New Prescription
                                </NewButton>
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
                                                                    maxW='150px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                        fontSize:
                                                                            '13px',
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
                                                                        fontSize:
                                                                            '13px',
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
                                                                        fontSize:
                                                                            '13px',
                                                                    }}>
                                                                    {
                                                                        data.prescribed
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    maxW='200px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                        fontSize:
                                                                            '13px',
                                                                    }}>
                                                                    {
                                                                        createdDate
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    maxW='100px'
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        color: '#15151D',
                                                                        fontSize:
                                                                            '13px',
                                                                    }}>
                                                                    {
                                                                        data.status
                                                                    }
                                                                </Td>
                                                                <Td
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

                                                                <Td maxW='100px'>
                                                                    <Menu>
                                                                        <MenuButton>
                                                                            <ViewButton
                                                                                direction='row'
                                                                                className='month'>
                                                                                <Box
                                                                                    w='70%'
                                                                                    className='viewbutton_text'>
                                                                                    <Text>
                                                                                        actions
                                                                                    </Text>
                                                                                </Box>
                                                                                <Box>
                                                                                    <Icon
                                                                                        icon='material-symbols:arrow-back-ios-new'
                                                                                        color='#616569'
                                                                                        rotate={
                                                                                            1
                                                                                        }
                                                                                        hFlip={
                                                                                            true
                                                                                        }
                                                                                        vFlip={
                                                                                            true
                                                                                        }
                                                                                        width={
                                                                                            '12'
                                                                                        }
                                                                                    />
                                                                                </Box>
                                                                            </ViewButton>
                                                                        </MenuButton>
                                                                        <MenuList className='menulist'>
                                                                            {/**<MenuItem>Account</MenuItem>  */}
                                                                            <MenuItem
                                                                                className='menulist_item'
                                                                                onClick={() =>
                                                                                    activateEditDetails(
                                                                                        data
                                                                                    )
                                                                                }>
                                                                                Update
                                                                                Prescription
                                                                            </MenuItem>
                                                                            <MenuItem className='menulist_item'>
                                                                                View
                                                                                all
                                                                                Refills
                                                                            </MenuItem>
                                                                        </MenuList>
                                                                    </Menu>
                                                                </Td>

                                                                <Td maxW='100px'>
                                                                    <ViewButton
                                                                        onClick={() =>
                                                                            activateRefill(
                                                                                {
                                                                                    pcbId: data.prescriptionId,
                                                                                    id: data._id,
                                                                                }
                                                                            )
                                                                        }
                                                                        direction='row'
                                                                        className='month'>
                                                                        <Box
                                                                            w='70%'
                                                                            className='viewbutton_text'>
                                                                            <Text>
                                                                                refill
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

            {/** creation modal */}
            <Modal
                size=''
                isOpen={createPrescription}
                p='0'
                w=''
                onClose={() => cancelSubmissionUpload()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' w='50%'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={{
                                drugName: '',
                                genericName: '',
                                drugclass: '',
                                prescribed: '',
                                active: 'inactive',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                let alldetails = {
                                    ...values,
                                    id: params.id,
                                }
                                setIsSubmittingp(() => true)
                                dispatch(CreatePrescription(alldetails))

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
                                                        Add New Prescription
                                                    </h1>
                                                </Box>
                                            </Stack>

                                            <Stack
                                                p='10px 20px 10px 20px'
                                                spacing='20px'>
                                                <Text className='form_head'>
                                                    drug details
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
                                                                Drug Name
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
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.drugName
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.drugName ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.drugName
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>
                                                        <Stack
                                                            direction='column'
                                                            spacing='11px'>
                                                            <Box className='content_title'>
                                                                Generic Name
                                                            </Box>

                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Input
                                                                    bg='#ffffff'
                                                                    placeholder='Chemical name of the drug'
                                                                    size='md'
                                                                    type='text'
                                                                    name='genericName'
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.genericName
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.genericName ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.genericName
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>
                                                        <Stack
                                                            direction='column'
                                                            spacing='11px'>
                                                            <Box className='content_title'>
                                                                Class
                                                            </Box>

                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Input
                                                                    bg='#ffffff'
                                                                    placeholder='Chemical type of the active ingredient or by the way of use'
                                                                    size='md'
                                                                    type='text'
                                                                    name='drugclass'
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.drugclass
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.drugclass ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.drugclass
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>

                                                        <Stack
                                                            direction='column'
                                                            spacing='11px'>
                                                            <Box className='content_title'>
                                                                Prescription
                                                            </Box>

                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Input
                                                                    bg='#ffffff'
                                                                    placeholder='e.g 2 x 1'
                                                                    size='md'
                                                                    type='text'
                                                                    name='prescribed'
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.prescribed
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.prescribed ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.prescribed
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Stack>

                                            {/** prescription status */}
                                            <Stack
                                                p='10px 20px 10px 20px'
                                                spacing='20px'>
                                                <Text className='form_head'>
                                                    PRESCRIPTION STATUS
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
                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Stack
                                                                    direction='row'
                                                                    spacing={
                                                                        '15px'
                                                                    }
                                                                    alignItems='center'>
                                                                    <Box m='0'>
                                                                        <Switch
                                                                            size='md'
                                                                            colorScheme='teal'
                                                                            isChecked={
                                                                                values.active ===
                                                                                'inactive'
                                                                                    ? false
                                                                                    : true
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                let checked =
                                                                                    e
                                                                                        .target
                                                                                        .checked ===
                                                                                    true
                                                                                        ? 'active'
                                                                                        : 'inactive'

                                                                                setFieldValue(
                                                                                    'active',
                                                                                    checked
                                                                                )
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                    <Box>
                                                                        <Text className='toggleText'>
                                                                            Change
                                                                            toggle
                                                                            if
                                                                            this
                                                                            prescription
                                                                            is
                                                                            recurring
                                                                        </Text>
                                                                    </Box>
                                                                </Stack>
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

            {/** edit prescription modal */}
            <Modal
                size=''
                isOpen={EditDetails}
                p='0'
                w=''
                onClose={() => cancelEditUpload()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' w='50%'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={prescriptionEditDetails}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                let alldetails = {
                                    ...values,
                                }
                                setIsSubmittingp1(() => true)
                                dispatch(EditPrescription(alldetails))

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
                                                        Prescription Information
                                                    </h1>
                                                </Box>
                                            </Stack>

                                            <Stack
                                                p='10px 20px 10px 20px'
                                                spacing='20px'>
                                                <Text className='form_head'>
                                                    drug details
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
                                                                Drug Name
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
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.drugName
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.drugName ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.drugName
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>
                                                        <Stack
                                                            direction='column'
                                                            spacing='11px'>
                                                            <Box className='content_title'>
                                                                Generic Name
                                                            </Box>

                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Input
                                                                    bg='#ffffff'
                                                                    placeholder='Chemical name of the drug'
                                                                    size='md'
                                                                    type='text'
                                                                    name='genericName'
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.genericName
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.genericName ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.genericName
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>
                                                        <Stack
                                                            direction='column'
                                                            spacing='11px'>
                                                            <Box className='content_title'>
                                                                Class
                                                            </Box>

                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Input
                                                                    bg='#ffffff'
                                                                    placeholder='Chemical type of the active ingredient or by the way of use'
                                                                    size='md'
                                                                    type='text'
                                                                    name='drugclass'
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.drugclass
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.drugclass ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.drugclass
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>

                                                        <Stack
                                                            direction='column'
                                                            spacing='11px'>
                                                            <Box className='content_title'>
                                                                Prescription
                                                            </Box>

                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Input
                                                                    bg='#ffffff'
                                                                    placeholder='e.g 2 x 1'
                                                                    size='md'
                                                                    type='text'
                                                                    name='prescribed'
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.prescribed
                                                                    }
                                                                />

                                                                {errors &&
                                                                errors.prescribed ? (
                                                                    <ErrorMsg>
                                                                        {
                                                                            errors.prescribed
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Stack>

                                            {/** prescription status */}
                                            <Stack
                                                p='10px 20px 10px 20px'
                                                spacing='20px'>
                                                <Text className='form_head'>
                                                    PRESCRIPTION STATUS
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
                                                            <Box
                                                                className='form_input'
                                                                w='100%'
                                                                minW='200px'>
                                                                <Stack
                                                                    direction='row'
                                                                    spacing={
                                                                        '15px'
                                                                    }
                                                                    alignItems='center'>
                                                                    <Switch
                                                                        colorScheme='teal'
                                                                        size='md'
                                                                        isChecked={
                                                                            values.active ===
                                                                            'inactive'
                                                                                ? false
                                                                                : true
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            let checked =
                                                                                e
                                                                                    .target
                                                                                    .checked ===
                                                                                true
                                                                                    ? 'active'
                                                                                    : 'inactive'

                                                                            setFieldValue(
                                                                                'active',
                                                                                checked
                                                                            )
                                                                        }}
                                                                    />
                                                                    <Text className='toggleText'>
                                                                        Change
                                                                        toggle
                                                                        if this
                                                                        prescription
                                                                        is
                                                                        recurring
                                                                    </Text>
                                                                </Stack>
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
                                                    cancelEditUpload()
                                                }>
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={!(isValid && dirty)}
                                                isLoading={
                                                    isSubmittingp1
                                                        ? true
                                                        : false
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

            {/** refills */}
            <Modal
                size=''
                isOpen={refillModal}
                p='0'
                w=''
                onClose={() => cancelRefillUpload()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' w='50%'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={refillDetails}
                            validationSchema={validationSchemaRefill}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                let alldetails = {
                                    ...values,
                                }
                                setIsSubmittingp2(() => true)
                                dispatch(CreateRefill(alldetails))

                                //console.log('values', values)
                            }}>
                            {({ values, errors }) => (
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
                                                    <h1>Refill Prescription</h1>
                                                </Box>
                                            </Stack>

                                            <Stack
                                                p='10px 20px 10px 20px'
                                                spacing='20px'>
                                                <Text>
                                                    Do you want to add a refill
                                                    for prescription -{' '}
                                                    {values.pcbId}?
                                                </Text>
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
                                                    cancelRefillUpload()
                                                }>
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={
                                                    isSubmittingp2
                                                        ? true
                                                        : false
                                                }
                                                isLoading={
                                                    isSubmittingp2
                                                        ? true
                                                        : false
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

export default ViewPatientPrescription

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

    .menulist {
        height: 100%;

        background: #ffffff;
    }

    .menulist_item {
        height: 30px;

        display: flex;
        font-family: 'Roboto', sans-serif;
        align-items: center;
        font-size: 15px;
        line-height: 15px;
        border: 1px solid transparent;

        &:hover {
            background: #f9fafa;
        }
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
    width: 100%;
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

    .chakra-switch__thumb {
        margin: 0 !important;
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
