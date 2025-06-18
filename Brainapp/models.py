from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    Role = [
        ("admin", _("Admin")),
        ("doctor", _("Doctor")),
        ("patient", _("Patient")),
    ]
    phone_validator = RegexValidator(
        regex=r"^\d{11,15}$", message=_("Phone number must be 10 to 15 digits.")
    )
    national_id_validator = RegexValidator(
        regex=r"^\d{14}$", message=_("National ID must be exactly 14 digits.")
    )

    national_id = models.CharField(
        max_length=14,
        unique=True,
        validators=[national_id_validator],
        verbose_name=_("National ID"),
    )
    name = models.CharField(max_length=255, verbose_name=_("Name"))
    role = models.CharField(max_length=50, choices=Role, verbose_name=_("Role"))
    Ph_No = models.CharField(
        unique=True,
        max_length=15,
        validators=[phone_validator],
        verbose_name=_("Phone Number"),
    )
    email = models.EmailField(
        unique=True, null=True, blank=True, verbose_name=_("Email")
    )

    def __str__(self):
        return self.name


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name=_("User"))
    specialty = models.CharField(max_length=100, verbose_name=_("Specialty"))

    def __str__(self):
        return self.user.name


class Patient(models.Model):
    gender = [("Male", _("Male")), ("Female", _("Female"))]
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name=_("User"))
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=_("Doctor"),
    )
    gender = models.CharField(max_length=10, choices=gender, verbose_name=_("Gender"))
    Age = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(120)], verbose_name=_("Age")
    )

    def __str__(self):
        return self.user.name


class MRI_Image(models.Model):
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=_("Doctor"),
    )
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, verbose_name=_("Patient")
    )
    image = models.ImageField(
        upload_to="image/", null=True, blank=True, verbose_name=_("Image")
    )
    date = models.DateTimeField(auto_now_add=True, verbose_name=_("Date"))


class Result(models.Model):
    mri_image = models.OneToOneField(
        MRI_Image, on_delete=models.CASCADE, verbose_name=_("MRI Image")
    )
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, verbose_name=_("Patient")
    )
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=_("Doctor"),
    )
    report = models.TextField(verbose_name=_("Report"))
    date = models.DateTimeField(auto_now_add=True, verbose_name=_("Date"))


class ContactUs(models.Model):
    issue_type = [
        ("Bug Report", _("Bug Report")),
        ("Feature Request", _("Feature Request")),
        ("System Improvment", _("System Improvement")),
        ("Other", _("Other")),
    ]
    priority_level = [
        ("Low", _("Low")),
        ("Medium", _("Medium")),
        ("High", _("High")),
        ("Urgent", _("Urgent")),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("User"))
    issue_type = models.CharField(
        max_length=50, choices=issue_type, verbose_name=_("Issue Type")
    )
    issue_title = models.CharField(max_length=255, verbose_name=_("Issue Title"))
    priority_level = models.CharField(
        max_length=10, choices=priority_level, verbose_name=_("Priority Level")
    )
    message = models.TextField(verbose_name=_("Message"))
    date = models.DateTimeField(auto_now_add=True, verbose_name=_("Date"))
