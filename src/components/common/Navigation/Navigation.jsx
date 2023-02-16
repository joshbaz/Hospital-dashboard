/* eslint-disable array-callback-return */
import React from 'react'
import styled from 'styled-components'
import { Box, Stack,  Text } from '@chakra-ui/react'
import Logo from '../../../assets/logo.png'
import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import '@fontsource/roboto'
const menuData = [
    {
        title: 'dashboard',
        icon: <Icon icon='bx:tachometer' color='#fff' width='24' height='24' />,
        link: '/',
        name: 'Dashboard',
        subMenu: [
            {
                title: 'overview',
                icon: <Icon icon='bx:home' width='24' height='24' />,
                link: '/',
                name: 'overview',
            },
            {
                title: 'Patient Database',
                icon: <Icon icon='bx:group' width='24' height='24' />,
                link: '/patientdatabase',
                name: 'Patient Database',
            },
            {
                title: 'account',
                icon: <Icon icon='bx:cog' width='24' height='24' />,
                link: '/account',
                name: 'Account',
            },
        ],
    },

    {
        title: 'Stats',
        icon: (
            <Icon
                icon='bx:pie-chart-alt-2'
                color='#fff'
                width='24'
                height='24'
            />
        ),
        link: '/stats',
        name: 'Stats',

        subMenu: [
            {
                title: 'Health Vitals',
                icon: <Icon icon='bx:pulse' width='24' height='24' />,
                link: '/stats',
                name: 'Health Vitals',
                subMenu: [
                    {
                        title: 'Blood Pressure',
                        icon: '',
                        link: '/stats/bloodpressure',
                        name: 'Blood Pressure',
                    },
                    {
                        title: 'Blood Sugar',
                        icon: '',
                        link: '/stats/bloodsugar',
                        name: 'Blood Sugar',
                    },
                    {
                        title: 'Fitness Activities',
                        icon: '',
                        link: '/stats/fitness',
                        name: 'Fitness Activities',
                    },
                ],
            },
            {
                title: 'Emergency List',
                icon: (
                    <Icon
                        icon='bx:message-rounded-dots'
                        width='24'
                        height='24'
                    />
                ),
                link: '/stats/emergencylist',
                name: 'Emergency List',
            },
        ],
    },
]

const Navigation = () => {
    const [activeItemtitle, setActiveItemTitle] = React.useState('')
    const [vitalsDropdown, setvitalsDropdown] = React.useState(true)
    let location = useLocation()

    console.log(location, 'location')

    /** function to select the table list */
    const submenuLists = React.useMemo(() => {
        console.log('location.pathname', location.pathname)
        if (
            location.pathname === '/' ||
            location.pathname === '/patientdatabase' ||
            location.pathname.includes('/patientdatabase') ||
            location.pathname === '/account'
        ) {
            const newdataArray = menuData.filter((data, index) => {
                if (data.title === 'dashboard') {
                    setActiveItemTitle(data.title)
                    return data
                }
            })

            return newdataArray[0].subMenu
        } else {
            if (location.pathname === '/stats/emergencylist') {
                setvitalsDropdown(false)
            } else {
            }
            const newdataArray = menuData.filter((data, index) => {
                if (data.title === 'Stats') {
                    setActiveItemTitle(data.title)
                    return data
                }
            })

            return newdataArray[0].subMenu
        }
    }, [location])

    console.log('submenuLists', submenuLists)
    return (
        <Container
            direction='row'
            w='303px'
            h='100vh'
            position='fixed'
            spacing='0px'>
            <Stack h='100vh' w='60px' bg='#3e66fb' spacing='20px'>
                <Box h='70px' w='100%' className='logo'>
                    <img src={Logo} alt='' />
                </Box>

                <Stack direction='column' spacing='0'>
                    {menuData.map((data, index) => (
                        <NavLink
                            key={index}
                            to={data.link}
                            end={data.link === '/' ? true : false}
                            className={({ isActive }) =>
                                isActive || activeItemtitle === data.title
                                    ? 'menu_wrap activeItem'
                                    : 'menu_wrap'
                            }>
                            <Stack direction='column' spacing='0px'>
                                <Box className='menu_icon'>{data.icon}</Box>
                            </Stack>
                        </NavLink>
                    ))}
                </Stack>
            </Stack>

            <Stack
                bg='#ffffff'
                h='100vh'
                alignItems={'center'}
                w='100%'
                spacing={'28px'}>
                <SubMenuHead h='65px'>
                    <Text>{activeItemtitle}</Text>
                </SubMenuHead>

                {/** submenu list */}
                <Stack
                    direction='column'
                    w='90%'
                    spacing='8px'
                    justifyContent={'center'}
                    alignItems={'center'}>
                    {submenuLists.map((data, index) => {
                        return (
                            <SubMenuList key={index}>
                                {data.subMenu ? (
                                    <Stack>
                                        <NavLink
                                            to={data.link}
                                            end={
                                                location.pathname !==
                                                '/stats/emergencylist'
                                                    ? false
                                                    : true
                                            }
                                            onClick={() =>
                                                setvitalsDropdown(
                                                    !vitalsDropdown
                                                )
                                            }
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'submenu_wrap2 subactiveItem2'
                                                    : 'submenu_wrap2'
                                            }>
                                            <Stack
                                                p='0 13px'
                                                direction='row'
                                                w='100%'
                                                justifyContent='space-between'
                                                alignItems='center'
                                                spacing='0px'>
                                                <Stack
                                                    direction='row'
                                                    spacing={'8px'}
                                                    alignItems='center'>
                                                    <Box className='submenu_icon'>
                                                        {data.icon}
                                                    </Box>
                                                    <Box>
                                                        <Text className='submenu_text'>
                                                            {data.title}
                                                        </Text>
                                                    </Box>
                                                </Stack>

                                                {vitalsDropdown ? (
                                                    <Box className='submenu_icon'>
                                                        <Icon
                                                            icon='material-symbols:arrow-back-ios-new'
                                                            rotate={1}
                                                            vFlip={true}
                                                            width={'12'}
                                                        />
                                                    </Box>
                                                ) : (
                                                    <Box className='submenu_icon'>
                                                        <Icon
                                                            icon='material-symbols:arrow-back-ios-new'
                                                            rotate={1}
                                                            hFlip={true}
                                                            vFlip={true}
                                                            width={'12'}
                                                        />
                                                    </Box>
                                                )}
                                            </Stack>
                                        </NavLink>

                                        {vitalsDropdown && (
                                            <Stack
                                                alignItems='center'
                                                justifyContent='center'>
                                                {data.subMenu.map(
                                                    (subdata, index) => {
                                                        return (
                                                            <Stack w='95%'>
                                                                <NavLink
                                                                    to={
                                                                        subdata.link
                                                                    }
                                                                    end={true}
                                                                    className={({
                                                                        isActive,
                                                                    }) =>
                                                                        isActive
                                                                            ? 'submenu_wrap subactiveItem'
                                                                            : 'submenu_wrap'
                                                                    }>
                                                                    <Stack
                                                                        p='0 13px'
                                                                        direction='row'
                                                                        spacing='0px'>
                                                                        <Stack
                                                                            direction='row'
                                                                            spacing={
                                                                                '8px'
                                                                            }
                                                                            alignItems='center'>
                                                                            <Box className='submenu_icon'>
                                                                                {
                                                                                    subdata.icon
                                                                                }
                                                                            </Box>
                                                                            <Box>
                                                                                <Text className='submenu_text'>
                                                                                    {
                                                                                        subdata.title
                                                                                    }
                                                                                </Text>
                                                                            </Box>
                                                                        </Stack>
                                                                    </Stack>
                                                                </NavLink>
                                                            </Stack>
                                                        )
                                                    }
                                                )}
                                            </Stack>
                                        )}
                                    </Stack>
                                ) : (
                                    <NavLink
                                        to={data.link}
                                        end={
                                            location.pathname !==
                                                '/patientdatabase' &&
                                            location.pathname.includes(
                                                '/patientdatabase'
                                            )
                                                ? false
                                                : true
                                        }
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'submenu_wrap subactiveItem'
                                                : 'submenu_wrap'
                                        }>
                                        <Stack
                                            p='0 13px'
                                            direction='row'
                                            spacing='0px'>
                                            <Stack
                                                direction='row'
                                                spacing={'8px'}
                                                alignItems='center'>
                                                <Box className='submenu_icon'>
                                                    {data.icon}
                                                </Box>
                                                <Box>
                                                    <Text className='submenu_text'>
                                                        {data.title}
                                                    </Text>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </NavLink>
                                )}
                            </SubMenuList>
                        )
                    })}
                </Stack>
            </Stack>
        </Container>
    )
}

export default Navigation

const Container = styled(Stack)`
    background: #1a1a24;

    align-items: center;
    padding-top: 0px;
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 31px;
            height: 31px;
            object-fit: cover;
        }
    }

    .menu_wrap {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;

        color: #d4d4d6;
    }

    .menu_icon {
        font-size: 20px;
    }

    .activeItem {
        background: #2e4cbc !important;

        color: #ffffff;
    }

    .menu_title {
        font-weight: 600;
        font-size: 9px;
        line-height: 11px;
        color: #d4d4d6;
        text-transform: uppercase;
    }
`
const SubMenuHead = styled(Box)`
    display: flex;

    align-items: center;
    width: 80%;

    p {
        font-weight: 600;
        font-size: 20px;
        line-height: 23px;
        text-transform: uppercase;
    }
`

const SubMenuList = styled(Box)`
    width: 100%;

    border-radius: 6.07031px;

    .submenu_wrap {
        width: 100%;

        display: flex;
        height: 48.56px;
        align-items: center;

        color: #767a7d;
        background: #ffffff;
        border-radius: 6.07031px;
        text-decoration: none;
    }

    .subactiveItem {
        width: 100%;
        display: flex;

        align-items: center;

        color: #3b57c0;
        background: #ecf0ff;
    }

    .submenu_icon {
        width: 25.15px;
        height: 25.15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .submenu_text {
        font-weight: 600;
        font-size: 12.1406px;
        line-height: 14px;
        text-transform: capitalize;
    }

    .submenu_wrap2 {
        width: 100%;

        display: flex;
        height: 48.56px;
        align-items: center;

        color: #767a7d;
        background: #ffffff;
        border-radius: 6.07031px;
        text-decoration: none;
    }

    .subactiveItem2 {
        width: 100%;
        display: flex;

        align-items: center;

        color: #3b57c0;
        background: #ecf0ff;
        background: #ffffff;
        border-bottom: 1px solid;
        border-radius: 0;
    }
`
