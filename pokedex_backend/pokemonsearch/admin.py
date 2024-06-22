from django.contrib import admin

# Register your models here.
from .models import Pokemon, PokemonStats

class PokemonAdmin(admin.ModelAdmin):
    list_display = ('pokedex_id', 'name', 'percentage_male', 'type1', 'type2', 'height', 'weight', 'abilities', 
                    'capture_rate', 'generation', 'is_legendary', 'category')

class PokemonStatsAdmin(admin.ModelAdmin):
    list_display = ('pokedex_id', 'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed', 
                    'base_total', 'base_happiness', 'exp_growth')

admin.site.register(Pokemon, PokemonAdmin)
admin.site.register(PokemonStats, PokemonStatsAdmin)
