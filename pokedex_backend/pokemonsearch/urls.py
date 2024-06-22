from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path("", views.PokemonList.as_view(), name="fetch-pokemon"),
    path("<str:identifier>", views.PokemonDetail.as_view(), name="fetch-single-pokemon"),
    path("stats/<int:pokedex_id>", views.PokemonStatsDetail.as_view(), name="pokemon-stats"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
