import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom'
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Logout () {
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate()
    const handleLogout = (e : any) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
        setShowConfirm(false);
        location.replace('/');
    }
    return (
        <>
            <Button variant = 'contained' 
                sx = {{m : 2}} 
                disableElevation 
                onClick = {() => setShowConfirm(true)}
            >
                Logout
            </Button>
            <Dialog 
                open = {showConfirm}
                onClose = {() => setShowConfirm(false)}
                aria-labelledby="alert-dialog-title"
                className="modal"
            >
                <DialogTitle id="alert-dialog-title">
                    Do you want to log out?
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} onClick = {handleLogout}>OK</Button>
                    <Button variant="contained" color="secondary" fullWidth sx={{ mt: 3, mb: 2 }} onClick = {() => setShowConfirm(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}