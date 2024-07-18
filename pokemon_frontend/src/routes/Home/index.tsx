import { useCallback, useEffect, useState } from 'react';
import { Alert, Backdrop, Box, CircularProgress } from '@mui/material';
import './index.css';
import axios from 'axios';
import { PokemonData } from '../../context/pokemonData';
import Display from '../Display';
import SearchContainer from '../Display/SearchContainer';
import AdvancedFilters from '../Display/AdvancedFilters';
import Header from './Header';

type Types = {
    [key: string]: boolean;
}

const Home = () => {
    const baseUrl = 'http://localhost:8000/api/';
    const [pokemonData, setPokemonData] = useState<Array<PokemonData>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [isList, setIsList] = useState<boolean>(true);
    const types = ['grass', 'fire', 'water', 'poison', 'flying', 'bug', 'normal', 'dark', 'ghost', 'electric', 'ground', 'ice', 'rock', 'fairy', 'psychic', 'fighting', 'dragon', 'steel']
    const gens = ['1', '2', '3', '4', '5', '6', '7']
    const [checked, setChecked] = useState<Types>(types.reduce((acc, key) => ({
        ...acc,
        [key]: false,
    }), {} as Types));    
    const setCheckbox = (type: string) => {
        setChecked(prevChecked => ({
            ...prevChecked,
            [type]: !prevChecked[type]
        }))
    }

    const [height, setHeight] = useState<number[]>([0, 15]);
    const handleHeight = (event: Event, newValue: number | number[]) => {setHeight(newValue as number[])};
    
    const [weight, setWeight] = useState<number[]>([0, 1000]);
    const handleWeight = (event: Event, newValue: number | number[]) => {setWeight(newValue as number[])};

    const [legendary, setLegendary] = useState<boolean>(false);
    
    const [gen, setGen] = useState<Types>(gens.reduce((acc, key) => ({
        ...acc,
        [key]: false,
    }), {} as Types));  
    const setGens = (g: string) => {
        setGen(prevGen => ({
            ...prevGen,
            [g]: !prevGen[g]
        }))
    }

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

    const isAnySelected = (obj: Types): boolean => {
        return Object.values(obj).some(value => value);
    };
    
    const filtered = pokemonData.filter((pk) => {
        const matchesSearch = pk.name.toLowerCase().startsWith(searchText.toLowerCase()) || pk.pokedex_id.toString().startsWith(searchText);
        const matchesType = !isAnySelected(checked) || Object.keys(checked).some(type => checked[type] && (pk.type1 === type || pk.type2 === type));    
        const matchesHeight = pk.height >= height[0] && pk.height <= height[1];
        const matchesWeight = pk.weight >= weight[0] && pk.weight <= weight[1];
        const matchesLegendary = !legendary ? pk: pk.is_legendary;
        const matchesGen = !isAnySelected(gen) || Object.keys(gen).some(g => gen[g] && pk.generation === parseInt(g));
        
        return matchesSearch && matchesType && matchesHeight && matchesWeight && matchesLegendary && matchesGen;
    }).sort((x, y) => x.pokedex_id - y.pokedex_id );

    return (
        <Box className="App">
            <Header />
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
                    <AdvancedFilters checked={checked} setCheckbox={setCheckbox} height={height} weight={weight} legendary = {legendary} gen={gen} setLegendary={setLegendary} handleHeight={handleHeight} handleWeight={handleWeight} setGens={setGens} />
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
