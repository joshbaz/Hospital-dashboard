import React, { useEffect } from 'react'
import { Box, Stack, Text, Input, Button, Switch } from '@chakra-ui/react'
import styled from 'styled-components'
import TopBar from '../../../components/common/Navigation/TopBar'
import Navigation from '../../../components/common/Navigation/Navigation'
import { Icon } from '@iconify/react'
import '@fontsource/open-sans'
import '@fontsource/roboto'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    let routeNavigate = useNavigate()

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
                                    <Box className='tablehead_btn'>
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
                                                value={'Maritza Mertz'}
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
                                                value={'11 May 1987'}
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
                                                value={'+254 114 635982'}
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
                                                    value={'Nurse'}
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
                                        <Box className='tablehead_btn tablehead_btn_c'>
                                            Change Settings
                                        </Box>
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
                                                <Switch />
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
                                                <Switch />
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
                                        <Box className='tablehead_btn'>
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
                                                    type='password'
                                                    value={'Maritza Mertz'}
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

const SearchContainer = styled(Stack)``

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
        height: 34px;
        text-transform: capitalize;
        border-bottom: 1px solid transparent;
    }

    .table_row {
        min-height: 56px;
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
