import Logout from '../../Logout';
import { MenuItems } from './MenuItems';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../../../styles/images/logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";

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
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    color: '#EE478D',
                    "&.MuiButton-disableElevation": {
                        color: "#FFFFFF!important"
                    },
                    '&.MuiButton-textPrimary:hover': {
                        color: '#EE478D!important',
                        background : '#faebf2'
                    },
                    '&.MuiButton-containedPrimary:hover': { 
                        color: '#FFFFFF!important',
                    },
                    '&.MuiButton-containedSecondary:hover': { 
                        color: '#FFFFFF!important',
                        background : '#CCCCCC!important'
                    }
                }
            },
        }
    },
});

export default function Navbar(prop : any) {
    const navigate = useNavigate()
    const handleSignin = (e : any) => {
        e.preventDefault()
        navigate('/signin')
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar position = 'fixed' elevation = {0} sx = {{
                background : '#FFFFFF',
                height : 80
            }}>
                <Toolbar>
                    <Typography variant = 'h6' sx = {{flexGrow : 1}}>
                        <img src={Logo} />
                    </Typography>
                    {MenuItems.map(item => (
                        <Button variant = 'text' onClick = {() => navigate(item.url)}>
                            {item.title}
                        </Button>
                    ))}
                    {prop.auth && (
                        <div>
                            <Avatar src = "/avatar_profile.png" sx = {{m : 2, margin: 0}}/>
                        </div>
                    )}
                    {!prop.auth && (
                        <div>
                            <Button variant = 'text' onClick = {() => navigate('/signup')}>
                                Sign up
                            </Button>
                        </div>
                    )}
                    {prop.auth && (
                        <div>
                            <Logout />
                        </div>
                    )}
                    {!prop.auth && (
                        <div>
                            <Button onClick = {(e) => handleSignin(e)} variant = 'contained' disableElevation>
                                Login
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};