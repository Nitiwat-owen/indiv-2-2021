import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { userActions } from '../actions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import MedicationIcon from '@mui/icons-material/Medication';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props: any) {
// 	return (
// 		<Typography
// 			variant="body2"
// 			color="text.secondary"
// 			align="center"
// 			{...props}
// 		>
// 			{'Copyright © '}
// 			<Link color="inherit" href="https://mui.com/">
// 				Your Website
// 			</Link>{' '}
// 			{new Date().getFullYear()}
// 			{'.'}
// 		</Typography>
// 	);
// }

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
		MuiCheckbox: {
			styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
					color: '#d6638e!important',
                },
            },
		}
    },
});

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
    const location = useLocation();

	// reset login status
	useEffect(() => { 
		dispatch(userActions.logout()); 
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const username = formData.get('username');
		const password = formData.get('password');
		if (username && password) {
            // get return url from location state or default to home page
            const { from }: any = location.state || { from: { pathname: "/analysis" } };
            dispatch(userActions.login(username, password, from));
        }
	};
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<Card sx={{ minWidth: 275 ,mt:8, p:5} }>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar className="drawer"
						sx={{ m: 1 }}
					>
						<MedicationIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="/ForgotPassword" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/signup" variant = "body2">
									{' '}
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				</Card>
			</Container>
		</ThemeProvider>
	);
}
export default Login;
