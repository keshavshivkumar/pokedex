# Pokedex

## Overview: 

- The application uses a ReactJS based frontend, using TypeScript, a Django based backend, and a PostgreSQL database.
- The `dataset` folder contains the preprocessed data.
- `Material-UI` was used for themeing.
- Data was obtained from [Kaggle](https://www.kaggle.com/datasets/rounakbanik/pokemon/data)

## Current Progress:

- The cleaned Pokemon data is loaded into a Django model, and currently stores the basic information of Pokemon into the `pokemon` table.
- The presentable data, including the ID, Sprite, Name, Types, Classification, and Generation are loaded into the `Material-UI` `Table` component.
- The sprites of the Pokemon are obtained via [PokeAPI](https://pokeapi.co/docs/v2#pokemon)
- Dynamic search functionality on the basis of the Pokemon Name or ID is implemented.

## Future Progress:

- Development of a Django model to include a table of the Pokemon stats.
- Display for each Pokemon when clicked.
- Advanced search for filtering Pokemon.
