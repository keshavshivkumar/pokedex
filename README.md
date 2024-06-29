# Pokedex

## Overview: 

- The application uses a ReactJS based frontend, using TypeScript, a Django based backend, and a PostgreSQL database.
- The `dataset` folder contains the preprocessed data.
- `Material-UI` was used for themeing.
- Data was obtained from [Kaggle](https://www.kaggle.com/datasets/rounakbanik/pokemon/data)

## Current Progress:

- The cleaned Pokemon data is loaded into a Django model, and currently stores the basic information of Pokemon into the `pokemon` table in the backend.
- The presentable data, including the ID, Sprite, Name, Types, Classification, and Generation are loaded into the `CustomTable` and `CustomGrid` components, depending on the desired UI.
- The table has pagination integrated.
- The grid has lazy loading integrated.
- The sprites of the Pokemon are obtained via [PokeAPI](https://pokeapi.co/docs/v2#pokemon)
- Dynamic search functionality on the basis of the Pokemon Name or ID is implemented.
- Added a table in the backend along with a corresponding API for Pokemon Stats.
- Added a `Pokemon` component that displays details and stats of each Pokemon.

## Future Progress:

- Improve UI for Pokemon display.
- Advanced search for filtering Pokemon.
