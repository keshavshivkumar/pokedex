import { useState } from "react";
import { Box, Button, ButtonGroup, FormGroup, FormControlLabel, Checkbox, Slider } from "@mui/material";

interface FilterDisplayProps {
    filters: {[key: string]: boolean}
    toggleFilter: (filter: string) => void,
    checked: Types,
    setCheckbox: (type: string) => void,
    height: number[],
    handleHeight: (_: Event,type: number | number[]) => void,
    weight: number[],
    handleWeight: (_: Event,type: number | number[]) => void,
    legendary: boolean,
    setLegendary: React.Dispatch<React.SetStateAction<boolean>>,
    gen: Types,
    setGens: (type: string) => void
}

type Types = {
    [key: string]: boolean;
}

const FilterDisplay = (props: FilterDisplayProps) => {
    const {filters, toggleFilter, checked, setCheckbox, height, weight, legendary, gen, setLegendary, handleHeight, handleWeight, setGens} = props
    console.log(gen)
    return <>
        <Box className='filter-list' sx={{justifyContent:'center', padding:'20px', color:'black'}}>
            <ButtonGroup variant="text" size="large">
                <Button id='type' onClick={()=>toggleFilter('type')} color={filters['type'] ? 'error' : 'success'}>Type</Button>
                <Button id='height' onClick={()=>toggleFilter('height')} color={filters['height'] ? 'error' : 'success'}>Height</Button>
                <Button id='weight' onClick={()=>toggleFilter('weight')} color={filters['weight'] ? 'error' : 'success'}>Weight</Button>
                <Button id='legendary' onClick={()=>setLegendary(!legendary)} color={legendary ? 'error' : 'success'}>Legendary</Button>
                <Button id='legendary' onClick={()=>toggleFilter('gen')} color={filters['gen'] ? 'error' : 'success'}>Generation</Button>
            </ButtonGroup>
        </Box>
        {Object.values(filters).some(val => val === true) && 
            <Box className='filter-options' sx={{padding:'10px', color:'black', maxWidth:1/2, margin: 'auto'}} >
                {filters.type && 
                    <FormGroup sx={{placeSelf: 'center', alignItems: 'center', justifyContent: 'center', display: 'grid', gridTemplateColumns: 'auto auto auto', padding:'20px', color:'black'}}>
                        {Object.keys(checked).map((type: string) => (
                            <FormControlLabel key={type} control={<Checkbox />} label={type.charAt(0).toUpperCase() + type.slice(1)} 
                                checked={checked[type]} onClick={() => setCheckbox(type)} />
                        ))}
                    </FormGroup>
                }
                {filters.height &&
                    <Box className='slider'>
                        Height (m):
                        <Slider
                            getAriaLabel={() => 'Height range'}
                            value={height}
                            onChange={handleHeight}
                            valueLabelDisplay="auto"
                            min={0}
                            max={15}
                        />
                    </Box>    
                }
                {filters.weight &&
                    <Box className='slider'>
                        Weight (lb):
                        <Slider
                            getAriaLabel={() => 'Weight range'}
                            value={weight}
                            onChange={handleWeight}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000}
                        />
                    </Box>
                }
                {filters.gen &&
                    <ButtonGroup variant="outlined" size="large">
                        {Object.keys(gen).map((g: string) => (
                            <Button id={`gen-${g}`} key={g} onClick={() => setGens(g)} variant={gen[g] ? "contained" : "outlined"}>{g}</Button>
                        ))}
                    </ButtonGroup>
                }
            </Box>
        }
    </>
}

export default FilterDisplay;
