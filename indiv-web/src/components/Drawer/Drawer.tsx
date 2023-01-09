import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { SideMenus }  from './SideMenus'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import Logo from '../../styles/images/logo.png';
import Typography from '@mui/material/Typography'
import CircleIcon from '@mui/icons-material/Circle';
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import {useNavigate, useLocation} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240
const theme = createTheme({
    palette: {
        primary: {
            main: '#EE478D',
        },
        secondary: {
            main: '#CCCCCC!important'
        }
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#d6638e',
                    '&.MuiButtonBase-root:hover .MuiListItemText-root': { 
                        color: '#d6638e!important'
                    },
                    '&.MuiButtonBase-root:hover .MuiListItemIcon-root': { 
                        color: '#d6638e!important'
                    }
                }
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#d6638e'
                }
            },
        }
    },
});

const SideBar = ( prop : any) => {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname.split("/")[1]
    const menuItem = path == 'analysis' ? SideMenus.analysis : path == 'pipeline' ? SideMenus.pipeline : SideMenus.library
    return (
        <ThemeProvider theme={theme}>
            <Drawer 
                variant = "persistent" 
                anchor = "left" 
                open = {prop.auth} 
                sx ={{flexShrink : 0, 
                    "& .MuiDrawer-paper" : {
                        width : drawerWidth,
                        background : '#faebf2',
                        marginTop: '80px',
                        borderRight: 3,
                        borderColor: '#FFFFFF'
                    }
                }}
            >
                <Box sx = {{my : 5}}>
                    <Typography sx = {{ 
                        mx: 2, 
                        color: "#d6638e", 
                        fontWeight: "bold", 
                        fontSize: "18px" 
                        }
                    }>
                        {path.toUpperCase()}
                    </Typography>
                    <List sx = {{my : 2, color: "#d6638e" }}>
                        {menuItem.map((item : any)=> (
                            <ListItem
                                button
                                key = {item.title}
                                onClick = {() => navigate(item.url)}
                                sx = {{
                                    background : location.pathname == item.url ? '#d6638e' : null, 
                                    color: location.pathname == item.url ? '#FFFFFF' : null,
                                }}
                            >
                                <ListItemIcon sx = {{
                                    minWidth: "30px",
                                    color: location.pathname == item.url ? "#FFFFFF" : null,
                                }}>
                                    <CircleIcon sx = {{fontSize: "10px"}} />
                                </ListItemIcon>
                                <ListItemText primary = {item.title}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </ThemeProvider>
    )
}

export default SideBar;