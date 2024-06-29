import { useCallback, useEffect, useState } from 'react';
import { Alert, Backdrop, Box, CircularProgress } from '@mui/material';
import './index.css';
import axios from 'axios';
import { PokemonData } from '../../context/pokemonData';
import Display from '../Display';
import SearchContainer from '../Display/SearchContainer';
import Header from './Header';

const Home = () => {
    const baseUrl = 'http://localhost:8000/api/';
    const [pokemonData, setPokemonData] = useState<Array<PokemonData>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [isList, setIsList] = useState<boolean>(true);


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
        if (pk.name.toLowerCase().startsWith(searchText.toLowerCase())) {
            return true;
        } else if (pk.pokedex_id.toString().startsWith(searchText)) {
            return true;
        }
        return false;
    })

    return (
        <Box className="App">
            <Header />
            <hr id="hr-line"/>
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
                    <SearchContainer searchText={searchText} setSearchText={setSearchText} isList={isList} setIsList={setIsList} />
                    <Display pokemonData={filtered} isList={isList} />
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
