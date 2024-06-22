from .models import Pokemon, PokemonStats
from rest_framework import serializers

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = '__all__'

class PokemonStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PokemonStats
        fields = '__all__'
