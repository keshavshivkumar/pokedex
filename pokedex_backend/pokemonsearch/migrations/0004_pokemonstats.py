# Generated by Django 5.0.6 on 2024-06-21 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonsearch', '0003_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PokemonStats',
            fields=[
                ('pokedex_id', models.IntegerField(primary_key=True, serialize=False)),
                ('hp', models.IntegerField()),
                ('attack', models.IntegerField()),
                ('defense', models.IntegerField()),
                ('sp_attack', models.IntegerField()),
                ('sp_defense', models.IntegerField()),
                ('speed', models.IntegerField()),
                ('base_total', models.IntegerField()),
                ('base_happiness', models.IntegerField()),
                ('exp_growth', models.IntegerField()),
            ],
            options={
                'db_table': 'pokestats',
            },
        ),
    ]
