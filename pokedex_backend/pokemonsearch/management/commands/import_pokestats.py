import csv
from django.core.management.base import BaseCommand
from pokemonsearch.models import PokemonStats

class Command(BaseCommand):
    help = 'Import Pokemon stats from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the CSV file to import')

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['csv_file']

        with open(csv_file_path, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                PokemonStats.objects.create(
                    pokedex_id=row['pokedex_number'],
                    hp=row['hp'],
                    attack=row['attack'],
                    defense=row['defense'],
                    sp_attack=row['sp_attack'],
                    sp_defense=row['sp_defense'],
                    speed=row['speed'],
                    base_total=row['base_total'],
                    base_happiness=row['base_happiness'],
                    exp_growth=row['experience_growth']
                )

        self.stdout.write(self.style.SUCCESS('Successfully imported data from "%s"' % csv_file_path))
