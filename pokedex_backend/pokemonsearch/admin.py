from django.contrib import admin

# Register your models here.
from .models import Pokemon

class PokemonAdmin(admin.ModelAdmin):
    list_display = ('pokedex_id', 'name', 'percentage_male', 'type1', 'type2', 'height', 'weight', 'abilities', 
                    'capture_rate', 'generation', 'is_legendary', 'category')

admin.site.register(Pokemon, PokemonAdmin)
