from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path("", views.PokemonList.as_view(), name="search"),
    path("<str:identifier>", views.PokemonDetail.as_view(), name="search-by-name-or-id"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
