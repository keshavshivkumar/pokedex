from .models import Pokemon
from rest_framework import serializers

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ['pokedex_id', 'name', 'percentage_male', 'type1', 'type2', 'height', 'weight', 'abilities', 
                  'capture_rate', 'generation', 'is_legendary', 'category']
