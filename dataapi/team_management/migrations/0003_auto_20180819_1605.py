# Generated by Django 2.1 on 2018-08-19 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team_management', '0002_auto_20180819_1604'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, upload_to='', verbose_name='Person avatar'),
        ),
    ]
