import React from 'react'
import Navbar from './Navbar/NavbarHeader'
import Drawer from '../Drawer/Drawer'
import Box from '@mui/material/Box'

const Layout = (  prop : any ) => {
    return (
        <>
            <Navbar auth = {prop.auth}/>
            <Drawer auth = {prop.auth}/>
            <Box sx = {{pt : 9 , pl : prop.auth ? 30 : 0}}>
                {prop.children}
            </Box>
        </>
    )
}

export default Layout;
