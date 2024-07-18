import requests
from django.core.management.base import BaseCommand
from pokemonsearch.models import Pokemon 

POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/'

class Command(BaseCommand):
    help = 'Update Pokémon data by fetching correct values from PokeAPI'

    def handle(self, *args, **kwargs):
        pokemon_list = Pokemon.objects.filter(height=-1) | Pokemon.objects.filter(weight=-1)
        for pokemon in pokemon_list:
            response = requests.get(f'{POKEAPI_BASE_URL}/pokemon/{pokemon.pokedex_id}')
            if response.status_code == 200:
                data = response.json()
                pokemon.height = data.get('height', pokemon.height)/10
                pokemon.weight = data.get('weight', pokemon.weight)/10
                pokemon.save()
                self.stdout.write(self.style.SUCCESS(f'Updated {pokemon.name} with ID {pokemon.pokedex_id}'))
            else:
                self.stdout.write(self.style.ERROR(f'Failed to fetch data for {pokemon.name} with ID {pokemon.pokedex_id}'))
