import { Box, TextField, InputAdornment, Tooltip, IconButton, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../../theme";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridOnIcon from '@mui/icons-material/GridOn';

interface SearchContainerProps {
    searchText: string
    setSearchText: React.Dispatch<React.SetStateAction<string>>
    isList: boolean
    setIsList: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchContainer = (props: SearchContainerProps) => {
    const {searchText, setSearchText, isList, setIsList} = props

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <Box id="search-container" sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                padding: '10px'
            }}>
                <TextField 
                    id="search-input" 
                    variant="outlined" 
                    label="Enter Pokemon Name or ID" 
                    value={searchText} 
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <img id='pokeball' alt='pokeball icon' src='./pokeball.png' />
                        </InputAdornment>
                        ),
                    }}
                    onChange={event => setSearchText(event.target.value)} 
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    sx={{
                        width: '50%',
                        '& .MuiInputBase-root': {
                        padding: '2px',
                        margin: '10px',
                        backdropFilter: 'blur(5px) brightness(80%)',
                        },
                    }}
                />
                <Box id="icons">
                    <Tooltip title="List">
                        <IconButton id='list' onClick={()=>setIsList(!isList)} disabled={isList}>
                            <FormatListBulletedIcon sx={{
                                verticalAlign: 'center',
                                width: '32px',
                                height: '32px',
                                padding: '2px', 
                            }}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Grid">
                        <IconButton id='grid' onClick={()=>setIsList(!isList)} disabled={!isList}>
                            <GridOnIcon sx={{
                                width: '32px',
                                height: '32px',
                                padding: '2px',
                            }}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default SearchContainer;
