from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from .models import Pokemon
from .serializers import PokemonSerializer

class PokemonList(APIView):
    def get(self, request):
        pokemon = Pokemon.objects.all()
        serializer = PokemonSerializer(pokemon, many=True)
        return JsonResponse(serializer.data, safe=False)

class PokemonDetail(APIView):
    def get_object(self, identifier):
        try:
            if identifier.isdigit():
                return Pokemon.objects.get(pk=int(identifier))
            else:
                return Pokemon.objects.get(name=identifier.lower().capitalize())
        except Pokemon.DoesNotExist:
            return None
        
    def get(self, request, identifier):
        pokemon = self.get_object(identifier)
        if pokemon is None:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer = PokemonSerializer(pokemon)
        return JsonResponse([serializer.data], safe=False)