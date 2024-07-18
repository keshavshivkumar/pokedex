import { useState } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { lightTheme, darkTheme } from "../../theme";
import FilterDisplay from "./FilterDisplay";

type Types = {
    [key: string]: boolean;
}

interface AdvancedFilterProps {
    checked: Types,
    setCheckbox: (type: string) => void,
    height: number[],
    handleHeight: (_: Event, type: number | number[]) => void,
    weight: number[],
    handleWeight: (_: Event, type: number | number[]) => void,
    legendary: boolean,
    setLegendary: React.Dispatch<React.SetStateAction<boolean>>,
    gen: Types,
    setGens: (type: string) => void
}

const AdvancedFilters = (props: AdvancedFilterProps) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [filters, setFilters] = useState<{ [key: string]: boolean }>({
        type: false,
        height: false,
        weight: false,
        legendary: false,
        gen: false
    });

    const toggleFilter = (filter: string) => {
        setFilters((prev) => {
            const newFilters = Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === filter ? !prev[key] : false;
                return acc;
            }, {} as { [key: string]: boolean });
            return newFilters;
        });
    };

    const {checked, setCheckbox, height, weight, legendary, gen, setLegendary, handleHeight, handleWeight, setGens} = props;

    return (
        <ThemeProvider theme={lightTheme}>
            <Box id='adv-filters' onClick={() => setClicked(!clicked)} 
                sx={{width: '12%', margin:'auto', alignItems: "center", color: 'grey', display:'flex', borderStyle: "outset", 
                    justifyContent:'center', padding:'10px', marginBottom: '10px', backdropFilter: 'blur(5px) brightness(90%)'}}> Advanced Search
                {!clicked && <ArrowDropDown id='adv-search-down' sx={{color:'black'}} />}
                {clicked && <ArrowDropUp id='adv-search-up' sx={{color:'black'}} />}
            </Box> 
            {clicked && <FilterDisplay filters={filters} toggleFilter={toggleFilter} 
                checked={checked} setCheckbox={setCheckbox} height={height} weight={weight} legendary={legendary} gen={gen} setLegendary={setLegendary} 
                handleHeight={handleHeight} handleWeight={handleWeight} setGens={setGens} />}
        </ThemeProvider>
    )
}

export default AdvancedFilters;
