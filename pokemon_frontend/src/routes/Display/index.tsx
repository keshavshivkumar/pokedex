import { Box } from "@mui/material"
import CustomTable from "./CustomTable"
import CustomGrid from "./CustomGrid"
import { PokemonData } from "../../context/pokemonData"

interface PokemonDataProps {
    pokemonData: Array<PokemonData>
    isList: Boolean
}

const Display = (props: PokemonDataProps) => {
    const {pokemonData, isList} = props;
    return (
        <Box style={{ width: "60%", margin: "auto" }}>
            {isList?<CustomTable pokemonData={pokemonData} />:
            <CustomGrid pokemonData={pokemonData}/>}
        </Box>
    )
}

export default Display;
