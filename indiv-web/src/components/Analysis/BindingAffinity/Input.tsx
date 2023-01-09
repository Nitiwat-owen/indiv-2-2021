import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, TextField, Button, Stack } from '@mui/material'
import { useRef, ChangeEvent } from 'react'
import { styled } from '@mui/material/styles'

interface InputProp {
    title : string
    inputText : string
    inputFile : File | undefined
    handleInputText : (newText : string) => void
    handleInputFile : (newFile : File) => void
    splitword : string
    limit : number
}

const Input = styled("input")({
    display : 'none'
})

const theme = createTheme({
    palette: {
        primary: {
            main: '#138D75',
        },
        secondary: {
            main: '#CCCCCC!important'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold',
                    color: '#FFFFFF'
                }
            },
        }
    },
});

const BindingInput : React.FC<InputProp> = ( prop ) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleOnClick = () => {
        inputRef.current.click()
    }

    const handleTextChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const text  = String(event.target.value).split(prop.splitword)
        if(text.length > prop.limit){
            text.splice(prop.limit, text.length - prop.limit)
        }
        prop.handleInputText(text.join(prop.splitword))
    }

    const handleFileChange = ( event : ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0){
            prop.handleInputFile(event.target.files[0])
            prop.handleInputText("")
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing = {5}>
                <Typography variant = "h4">{prop.title}</Typography>
                <TextField
                    multiline
                    rows = {6}
                    required
                    fullWidth
                    placeholder = "Paste SMILES"
                    value = { prop.inputFile ? prop.inputFile.name : prop.inputText}
                    onChange = {handleTextChange}
                    sx = {{
                        background : '#ffffff', 
                        '& .MuiOutlinedInput-root' : { 
                            '&.Mui-focused fieldset' : {
                                borderColor : '#D867CC'
                            }
                        }
                    }}
                    disabled = {prop.inputFile ? true : false}
                />
                <Input
                    type = "file"
                    accept = ".txt,.fasta"
                    ref = {inputRef}
                    onChange = {handleFileChange}
                />
                <Button
                    variant = "contained"
                    component = "span"
                    onClick = {handleOnClick}
                    size="medium"
                    sx = {{
                        width : 150
                    }}
                >
                    Upload File
                </Button>
            </Stack>
        </ThemeProvider>
    )
}

export default BindingInput