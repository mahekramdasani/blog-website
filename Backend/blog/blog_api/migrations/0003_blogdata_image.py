# Generated by Django 4.1.10 on 2023-09-08 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_api', '0002_alter_blogdata_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogdata',
            name='image',
            field=models.ImageField(blank=True, default='images/default.jpg', null=True, upload_to='images/'),
        ),
    ]