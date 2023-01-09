import React, { useEffect, useState } from 'react';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import {useNavigate} from 'react-router-dom';
import { userService } from '../services';

const theme = createTheme({
    palette: {
        primary: {
            main: '#d6638e'
        }
    },
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
					fontWeight: 'bold',
					color: '#FFFFFF!important',
                },
            },
        },
    },
});

const SignUp = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        document.title = "signup";
    });
    const [details, setDetails] = useState({
        username: "",
        email   : "",
        password: ""
    });
    const submitHandler = (e: any) => {
        e.preventDefault();
        userService.register(details).then(res => {
            console.log(res.data);
            navigate('/login');
		}).catch(err => {
			console.log(err);
		});
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Card sx={{ minWidth: 275 ,mt:8, p:5} }>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar className="drawer"
						sx={{ m: 1 }}
					>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                mt: 3,
                            }}
                            onSubmit={submitHandler}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="username"
                                        label="Username"
                                        id="outlined"
                                        fullWidth
                                        value={details.username}
                                        onChange = {e => setDetails({...details, username: e.target.value})}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="password"
                                        name="password"
                                        label="Password"
                                        id="outlined"
                                        autoComplete="new-password"
                                        value={details.password}
                                        onChange = {e => setDetails({...details, password: e.target.value})}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="email"
                                        name="email"
                                        label="Email Address"
                                        id="outlined"
                                        autoComplete="email"
                                        value={details.email}
                                        onChange = {e => setDetails({...details, email: e.target.value})}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Box>
                    </Box>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;
