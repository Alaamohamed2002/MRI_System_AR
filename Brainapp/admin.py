from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms
from .models import User, Doctor, Patient, MRI_Image, Result, ContactUs


# @admin.register(Customuser)
# class user(admin.ModelAdmin):
#     list_display=('id','name','email','Ph_No','role')
#     search_fields=('id',)
#     ordering=('id',)

class CustomUserAdminForm(forms.ModelForm):
    password = forms.CharField(required=False, widget=forms.PasswordInput, help_text="Optional.")

    class Meta:
        model = User
        fields = '__all__'

    def save(self, commit=True):
        user = super().save(commit=False)

        password = self.cleaned_data.get("password")

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        if commit:
            user.save()
        return user
class CustomUserAdmin(UserAdmin):
    form = CustomUserAdminForm
    add_form = CustomUserAdminForm  # Optional: same for add view
    model = User
    fieldsets = (
        (None, {'fields': ( 'national_id', 'name','role', 'Ph_No','email','username', 'password',   )}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('national_id', 'name', 'email', 'Ph_No', 'role','username', 'password')
        }),
    )

    list_display = ('id', 'national_id', 'name', 'username','role', 'email')
    search_fields = ('username', 'name', 'email')
    ordering = ('id',)

admin.site.register(User, CustomUserAdmin)

@admin.register(Doctor)
class doctor(admin.ModelAdmin):
    list_display = ('id', 'get_name', 'specialty')
    search_fields = ('user__name',)
    ordering = ('id',)

    def get_name(self, obj):
        return obj.user.name
    get_name.short_description = 'Doctor Name'

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = User.objects.filter(role='doctor')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    
@admin.register(Patient)
class patient(admin.ModelAdmin):
    list_display = ('id', 'get_name', 'Age', 'gender')
    search_fields = ('user__name',)
    ordering = ('id',)

    def get_name(self, obj):
        return obj.user.name
    get_name.short_description = 'Patient Name'

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = User.objects.filter(role='patient')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    
@admin.register(MRI_Image)
class mri_image(admin.ModelAdmin):
    list_display = ('id', 'get_patient_name', 'get_doctor_name', 'date', 'image')
    search_fields = ('id',)
    ordering = ('id',)

    def get_patient_name(self, obj):
        return obj.patient.user.name
    get_patient_name.short_description = 'Patient'

    def get_doctor_name(self, obj):
        return obj.doctor.user.name
    get_doctor_name.short_description = 'Doctor'

    
    
@admin.register(Result)
class result(admin.ModelAdmin):
    list_display = ('id', 'mri_image', 'get_doctor_name', 'get_patient_name', 'date', 'report') 
    search_fields = ('id',)
    ordering = ('id',)

    def get_doctor_name(self, obj):
        return obj.doctor.user.name
    get_doctor_name.short_description = 'Doctor'

    def get_patient_name(self, obj):
        return obj.patient.user.name
    get_patient_name.short_description = 'Patient'

    
@admin.register(ContactUs)
class contactus(admin.ModelAdmin):
    list_display=('id', 'issue_type','issue_title','priority_level','message','date')
    search_fields=('id',)
    ordering=('id',)
    