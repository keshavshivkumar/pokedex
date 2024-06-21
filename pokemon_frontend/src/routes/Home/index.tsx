import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Backdrop, Box, CircularProgress, TextField, InputAdornment } from '@mui/material';
import './index.css';
import PokemonTable from '../PokemonTable'
import axios from 'axios';
import { PokemonData } from '../../context/pokemonData';

const Home = () => {
    const baseUrl = 'http://localhost:8000/api/';
    const [pokemonData, setPokemonData] = useState<Array<PokemonData>>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(baseUrl);
            setPokemonData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => { fetchData() }, []);

    const filtered = pokemonData.filter((pk) => {
        if(pk.name.toLowerCase().startsWith(searchText.toLowerCase())){
            return true;
        } else if(pk.pokedex_id.toString().startsWith(searchText)){
            return true;
        }
        return false;
    })

    return (
        <Box className="App">
        <Box id="heading">
            <img src='../pokemon_logo.png' />
        </Box>
        {loading && 
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onChange={fetchData}
            >
            <CircularProgress color="inherit" />
          </Backdrop>
        }
        {pokemonData.length > 0 || loading ? (
            <Box id="container">
            <Box id="search-container">
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
                    sx={{
                        width: '50%',
                        '& .MuiInputBase-root': {
                        padding: '2px',
                        margin: '10px',
                        },
                    }}
                />
            </Box>
            <Box style={{ width: "60%", margin: "auto" }}>
                <PokemonTable pokemonData={filtered} />
            </Box>
            </Box>
        ) : (
            <Box id="empty-container">
                <Alert severity='error'>No rows fetched</Alert>
            </Box>
        )}
        </Box>
    );
}

export default Home;
