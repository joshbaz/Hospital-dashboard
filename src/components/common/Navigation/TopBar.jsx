import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

const TopBar = ({ topbarData }) => {
    let routeNavigate = useNavigate()

    let user = null
    return (
        <Container
            direction='row'
            h='65px'
            alignItems='center'
            padding={'0 20px'}
            bg='#ffffff'
            justifyContent='space-between'>
            <Box>
                <Stack direction='row' alignItems={'center'}>
                    {topbarData.backButton && (
                        <Box fontSize='20px' onClick={() => routeNavigate(-1)}>
                            {/**<MdArrowBack />**/}
                        </Box>
                    )}

                    <h1>{topbarData.title}</h1>
                    {topbarData.count && (
                        <Box className='total_num'>
                            <Text>{topbarData.count}</Text>
                        </Box>
                    )}
                </Stack>
            </Box>

            <Box h='100%'>
                <Stack
                    direction='row'
                    h='100%'
                    spacing='10px'
                    alignItems='center'>
                    <Box>
                        <Stack direction='column' h='100%' spacing='0px'>
                            <NameLabel>Deborah Holt</NameLabel>
                            <EmailLabel>debra.holt@example.com</EmailLabel>
                        </Stack>
                    </Box>

                    <Menu>
                        <MenuButton className='avatar'>
                            <Avatar
                                size='sm'
                                name={`${user !== null && user.firstname} ${
                                    user !== null && user.lastname
                                }'`}
                                src=''
                                bg='gray.400'
                            />
                        </MenuButton>
                        <MenuList className='menulist'>
                            {/**<MenuItem>Account</MenuItem>  */}

                            <MenuItem className='menulist_item'>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Stack>
            </Box>
        </Container>
    )
}

export default TopBar

const Container = styled(Stack)`
    background: #fbfbfb;

    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 32px;
        color: #222834;
    }

    .total_num {
        width: 27px;
        height: 22px;
        background: #fceded;
        border-radius: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            color: #f14c54;

            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
        }
    }

    .avatar {
        width: 41.66px;
        height: 41.66px;
        border-radius: 50% !important;
        border: 1px solid transparent;
    }

    .menulist {
        height: 100%;
        weight: 200px;
        background: #ffffff;
    }

    .menulist_item {
        height: 30px;
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        line-height: 15px;
        border: 1px solid transparent;
    }
`

const NameLabel = styled(Text)`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 15px;

    text-align: right;
    color: #2e4cbc;
`
const EmailLabel = styled(Text)`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;

    color: #8a8d90;
    text-align: right;
`
