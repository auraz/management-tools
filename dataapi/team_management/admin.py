from django.contrib import admin

from .models import Role, Skill, Team, Level, Parameter, Profile

admin.site.register(Role)
admin.site.register(Skill)
admin.site.register(Team)
admin.site.register(Level)
admin.site.register(Parameter)
admin.site.register(Profile)
