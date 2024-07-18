import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { PokemonData } from "../../context/pokemonData"
import { PokemonStats } from "../../context/pokemonStats"
import axios from "axios"
import { Box } from "@mui/material"
import Header from "../Home/Header"
import './index.css'

const Pokemon = () => {
    const baseUrl = 'http://localhost:8000/api';
    const { pokedex_id } = useParams<{ pokedex_id: string }>();
    const [pokemonData, setPokemonData] = useState<PokemonData>();
    const [pokemonStats, setPokemonStats] = useState<PokemonStats>();

    const fetchDetails = useCallback(async () => {
        if (!pokedex_id) return;
        try {
            const response = await axios.get(`${baseUrl}/${pokedex_id}`)

            if (response.data) {
                const [data] = response.data;
                setPokemonData(data);
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    const fetchStats = useCallback(async () => {
        if (!pokedex_id) return;
        try {
            const response = await axios.get(`${baseUrl}/stats/${pokedex_id}`)
            if (response.data) {
                const [data] = response.data;
                setPokemonStats(data);
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => { fetchDetails() }, [pokedex_id])
    useEffect(() => { fetchStats() }, [pokedex_id])

    return (
        <>
            <Header />
            <Box className='container'>
                <Box
                id='pokemon-sprite'
                component='img'
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedex_id}.png`}
                />
                {pokemonData && (
                <>
                    <Box className='pokemon-id-name'>
                    <Box id='pokemon-id'>ID: {pokedex_id}</Box>
                    <Box id='pokemon-name'>{pokemonData.name}</Box>
                    </Box>
                    <Box className='pokemon-gen'>Gen: {pokemonData.generation}</Box>
                    <Box className='pokemon-type'>
                    <Box id='pokemon-type1'>
                        {pokemonData.type2 !== '-' ? 'Type1: ' : 'Type: '}
                        {pokemonData.type1}
                    </Box>
                    {pokemonData.type2 !== '-' && (
                        <Box id='pokemon-type2'>&emsp;Type2: {pokemonData.type2}</Box>
                    )}
                    </Box>
                    <Box className='pokemon-abilities'>
                    Abilities: {JSON.parse(pokemonData.abilities.replace(/'/g, '"')).join(', ')}
                    </Box>
                    <Box className='pokemon-height-weight'>
                    <Box id='pokemon-height'>Height: {pokemonData.height}</Box>&emsp;
                    <Box id='pokemon-weight'>Weight: {pokemonData.weight}</Box>
                    </Box>
                    <Box className='pokemon-male'>Male Percentage: {pokemonData.percentage_male}%</Box>
                </>
                )}
                <Box className='secondary-sprite'>
                <Box
                    component='img'
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedex_id}.png`}
                    onMouseOver={e=>{e.currentTarget.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokedex_id}.png`}}
                    onMouseOut={e=>{e.currentTarget.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedex_id}.png`}}
                    onClick={e=>{e.currentTarget.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedex_id}.png`}}
                />
                </Box>
                {pokemonStats && (
                <Box className='pokemon-stats'>
                    <Box id='pokemon-hp'>HP: {pokemonStats.hp}</Box>
                    <Box id='pokemon-atk'>Atk: {pokemonStats.attack}</Box>
                    <Box id='pokemon-def'>Def: {pokemonStats.defense}</Box>
                    <Box id='pokemon-spa'>Sp. Atk: {pokemonStats.sp_attack}</Box>
                    <Box id='pokemon-spd'>Sp. Def: {pokemonStats.sp_defense}</Box>
                    <Box id='pokemon-speed'>Speed: {pokemonStats.speed}</Box>
                </Box>
                )}
            </Box>
        </>
    )
}

export default Pokemon;
