from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext as _


class Role(models.Model):
    """
    Roles
    """
    JUNIOR = 'Jr'
    MIDDLE = 'Md'
    SENIOR = 'Sr'
    PRINCIPAL = 'Pl'
    LEAD = 'Ld'

    PREFIX = (
        (JUNIOR, _("Junior")),
        (MIDDLE, _("Middle")),
        (SENIOR, _("Senior")),
        (PRINCIPAL, _("Principal")),
        (LEAD,  _("Lead"))
    )
    name = models.CharField(_("Role name"), max_length=256)
    prefix = models.CharField(max_length=2, choices=PREFIX, blank=True)
    description = models.CharField(_("Role description"), max_length=512, blank=True)

    @property
    def role(self):
        if self.prefix:
            return "{} {}".format(dict(self.PREFIX)[self.prefix], self.name)
        return self.name

    def __str__(self):
        return self.role


class Profile(models.Model):
    """
    User profile

    https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    team = models.ManyToManyField("team_management.Team", verbose_name=_("Teams"), blank=True)

    about = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    avatar = models.ImageField(_("Person avatar"), blank=True)

    def __str__(self):
        return "{} ({})".format(self.user.first_name, self.user.username)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Skill(models.Model):
    """
    Skills
    """
    name = models.CharField(_("Skill name"), max_length=256)
    description = models.TextField(_("Skill description"), max_length=512, blank=True)

    def __str__(self):
        return self.name


class Team(models.Model):
    name = models.CharField(_("Team name"), max_length=256)
    description = models.TextField(_("Team description"), max_length=512, blank=True)
    logo = models.ImageField(_("Team logo"), blank=True)

    def __str__(self):
        return self.name


class Level(models.Model):
    """
    Levels
    """
    name = models.CharField(_("Level name"), max_length=256)
    description = models.TextField(_("Level description"), max_length=512, blank=True)

    def __str__(self):
        return self.name


class Parameter(models.Model):
    """
    Parameters
    """
    name = models.CharField(_("Parameter name"), max_length=256)
    description = models.TextField(_("Parameter description"), max_length=512, blank=True)

    def __str__(self):
        return self.name
