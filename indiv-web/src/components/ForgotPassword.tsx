import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { userService } from '../services';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function ForgotPassword() {
	const navigate = useNavigate();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const details: any = {email: data.get('email')};
		userService.forgotPassword(details).then(res => {
            console.log(res.data);
            navigate('/login');
		}).catch(err => {
			console.log(err);
		});
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
							<LockIcon sx={{ fontSize: 25 }} />
						</Avatar>
						<Typography component="h1" variant="h5">
							Forgot password
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
								id="email"
								label="Enter your email"
								name="email"
								autoComplete="email"
								autoFocus
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Confirm
							</Button>
							<Typography variant="body2" align="center">
								<Link href="/signup"> Don't have an account? Sign Up</Link>
							</Typography>
						</Box>
					</Box>
				</Card>
			</Container>
		</ThemeProvider>
	);
}
export default ForgotPassword;
