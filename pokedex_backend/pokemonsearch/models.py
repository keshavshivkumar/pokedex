# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Pokemon(models.Model):
    pokedex_id = models.IntegerField(primary_key=True)
    name = models.TextField()
    percentage_male = models.FloatField(blank=True, null=True)
    type1 = models.TextField()
    type2 = models.TextField(blank=True, null=True)
    height = models.FloatField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    abilities = models.TextField(blank=True, null=True)
    capture_rate = models.FloatField(blank=True, null=True)
    generation = models.IntegerField(blank=True, null=True)
    is_legendary = models.BooleanField(blank=True, null=True)
    category = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pokemon'
        verbose_name = 'Pokemon'
        verbose_name_plural = 'Pokemon'

class PokemonStats(models.Model):
    pokedex_id = models.IntegerField(primary_key=True)
    hp=models.IntegerField()
    attack=models.IntegerField()
    defense=models.IntegerField()
    sp_attack=models.IntegerField()
    sp_defense=models.IntegerField()
    speed=models.IntegerField()
    base_total=models.IntegerField()
    base_happiness=models.IntegerField()
    exp_growth=models.IntegerField()

    class Meta:
        db_table = 'pokestats'
        verbose_name = 'Pokemon Stat'
        verbose_name_plural = 'Pokemon Stats'
