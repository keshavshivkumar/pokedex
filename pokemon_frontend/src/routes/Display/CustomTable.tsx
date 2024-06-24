import React from 'react';
import './index.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import {TablePagination} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PokemonData } from '../../context/pokemonData';
import Pagination from './Pagination';
import { TableFooter } from '@mui/material';

interface PokemonDataProps {
  pokemonData: Array<PokemonData>
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    fontWeight: 'fontWeightMedium',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const CustomTable = (props: PokemonDataProps) => {
  const {pokemonData} = props;
  const rows = pokemonData.map((pokemon) => (
    {
      id: `#${'0'.repeat(4-(pokemon.pokedex_id).toString().length)}${pokemon.pokedex_id}`, 
      sprite: [
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokemon.pokedex_id}.png`,
         pokemon.name
        ],
      name: pokemon.name, 
      type: [pokemon.type1, pokemon.type2],
      cat: pokemon.category,
      gen: pokemon.generation
    }
  ))

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align='center'>Name</StyledTableCell>
            <StyledTableCell align='center'>Type</StyledTableCell>
            <StyledTableCell align='center'>Category</StyledTableCell>
            <StyledTableCell>Gen</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell><img src={row.sprite[0]} alt={row.sprite[1]} /></StyledTableCell>
              <StyledTableCell align='center'>{row.name}</StyledTableCell>
              <StyledTableCell align='center'>
                <Box id="pokemon-types">
                  <Box id={row.type[0]} display={'flex'} justifyContent={'center'} margin={3/4}>
                    <span>{row.type[0].toUpperCase()}</span>
                  </Box>
                  {row.type[1] !== '-' && 
                    <Box id={row.type[1]} display={'flex'} justifyContent={'center'} margin={`${row.type[1]==='-' ? 1 : 1/3}`}>
                      <span>{row.type[1].toUpperCase()}</span>
                    </Box>
                  }
                </Box>
              </StyledTableCell>
              <StyledTableCell align='center'>{row.cat}</StyledTableCell>
              <StyledTableCell>{row.gen}</StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 5 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
        <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={Pagination}
            />
        </TableFooter>
      </Table>
    </TableContainer>
  )
} 

export default CustomTable;
