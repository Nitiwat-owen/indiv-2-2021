import React from 'react'
import {Snackbar, Alert, Typography} from '@mui/material'
import Grow, {GrowProps} from '@mui/material/Grow'

const growTransition = (props: GrowProps) => <Grow {...props} />;

const StatusBar: React.FC<{
    open :boolean
    onClose : () => void
    handleExit : () => void
    status : number
    message : string
}> = ({open, onClose, handleExit, status, message}) => {
    return (
        <Snackbar
            autoHideDuration = {6000}
            open = {open}
            onClose = {onClose}
            anchorOrigin = {{vertical : 'top', horizontal : 'center'}}
            TransitionComponent = {growTransition}
            TransitionProps = {{ onExited : handleExit}}
        >
            <Alert
                onClose = {onClose}
                severity={status >= 200 && status <= 299 ? "success" : "error"}
                elevation={6}
                sx={{ display: "flex", alignItems: "center" }}
            >
                <Typography
                    textAlign="center"
                    sx={{ fontSize: "20px", fontWeight: "700" }}
                >
                    {message}
                </Typography>
            </Alert>
        </Snackbar>
    )
}

export default StatusBar;