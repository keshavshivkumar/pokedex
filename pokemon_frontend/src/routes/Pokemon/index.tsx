import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { PokemonData } from "../../context/pokemonData"
import { PokemonStats } from "../../context/pokemonStats"
import axios from "axios"
import { Box } from "@mui/material"
import Header from "../Home/Header"

const Pokemon = () => {
    const baseUrl = 'http://localhost:8000/api';
    const { pokedex_id } = useParams<{ pokedex_id: string }>();
    const [pokemonData, setPokemonData] = useState<PokemonData>();
    const [pokemonStats, setPokemonStats] = useState<PokemonStats>();

    const fetchDetails = useCallback(async () => {
        if (!pokedex_id) return;
        try {
            const response = await axios.get(`${baseUrl}/${pokedex_id}`)
            console.log(response.data);

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
            console.log(response.data);

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
            <Box id='container' sx={{width:'60%', display:'inline-block'}}>
                <Box id={'pokemon-sprite'} component='img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedex_id}.png`}></Box>
                {pokemonData && (
                    <Box id='pokemon-details' sx={{float:"left"}}>
                        <Box id={'pokemon-id'}>ID: {pokedex_id}</Box>
                        <Box id={'pokemon-name'}>Name: {pokemonData.name}</Box>
                        <Box id={'pokemon-type1'}>Type1: {pokemonData.type1}</Box>
                        <Box id={'pokemon-type2'}>Type2: {pokemonData.type2}</Box>
                        <Box id={'pokemon-gen'}>Gen: {pokemonData.generation}</Box>
                        <Box id={'pokemon-male'}>Male%: {pokemonData.percentage_male}</Box>
                    </Box>
                )}
                {pokemonStats && (
                    <Box id='pokemon-stats' sx={{float:"right"}}>
                        <Box id={'pokemon-hp'}>{pokemonStats.hp}</Box>
                        <Box id={'pokemon-atk'}>{pokemonStats.attack}</Box>
                        <Box id={'pokemon-def'}>{pokemonStats.defense}</Box>
                        <Box id={'pokemon-spa'}>{pokemonStats.sp_attack}</Box>
                        <Box id={'pokemon-spd'}>{pokemonStats.sp_defense}</Box>
                        <Box id={'pokemon-speed'}>{pokemonStats.speed}</Box>
                    </Box>
                )}
            </Box>
        </>
    )
}

export default Pokemon;
