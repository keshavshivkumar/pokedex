import { useState, useEffect } from "react"
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Link, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { PokemonData } from '../../context/pokemonData';
import { useInView } from 'react-intersection-observer';

interface PokemonDataProps {
    pokemonData: Array<PokemonData>
}

const CustomGrid = (props: PokemonDataProps) => {
    const {pokemonData} = props;
    const [visibleCount, setVisibleCount] = useState(12);
    const { ref, inView } = useInView({
        threshold: 1,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
            setVisibleCount((prevCount) => prevCount + 12);
        }
    }, [inView]);

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {
            pokemonData.slice(0, visibleCount).map((pokemon, index) => (
                <Grid xs={4} key={`${pokemon.pokedex_id}`}>
                    <Card id={`${pokemon.pokedex_id}`}>
                        <Link id="pokemon-link" href={`/pokemon/${pokemon.pokedex_id}`}>
                        <CardMedia
                                sx={{height: 300, backgroundColor: 'grey'}}
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.pokedex_id}.png`} />
                        </Link>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="textSecondary">
                                    {`#${'0'.repeat(4-(pokemon.pokedex_id).toString().length)}${pokemon.pokedex_id}`}
                                </Typography>
                                <Typography id="pokemon-types" sx={{display:"inline-block", margin:"2px"}}>
                                    <Box id={pokemon.type1} sx={{float:"left"}}><span>{pokemon.type1.toUpperCase()}</span></Box>
                                    {pokemon.type2 !== '-' && <Box id={pokemon.type2} sx={{float:"right"}}><span>{pokemon.type2.toUpperCase()}</span></Box>}
                                </Typography>
                                <Typography color="textSecondary">{pokemon.generation}</Typography>
                            </Box>
                            <Typography variant="h5" component="div"><Link id="pokemon-link" href={`/pokemon/${pokemon.pokedex_id}`}>{pokemon.name}</Link></Typography>
                        </CardContent>
                    </Card>
                    {index === visibleCount - 1 && <div ref={ref} />}
                </Grid>
            ))
        }
        </Grid>
        )
    }

export default CustomGrid;
