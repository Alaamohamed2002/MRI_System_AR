
# ߧ MRI_Analysis - Django Web Application

**MRI_Analysis** is a Django-based web application designed for local development using a virtual environment, SQLite database, and support for media uploads.

## ߓ Tech Stack
- Python 3.8+
- Django 5.1.3
- SQLite (default database)
- Pillow (image processing)
- Django Extensions (for helpful dev tools)

##  ߚGetting Started

### 1. Activate Virtual Environment
    env\Scripts\activate

> If `env` doesn't exist, create it first:
    python -m venv env
    env\Scripts\activate

### 2. Install Dependencies
    pip install django
    pip install pillow
    pip install django-extensions

### 3. Run Migrations
    python manage.py makemigrations
    python manage.py migrate

### 4. Create Superuser (optional)
    python manage.py createsuperuser

### 5. Run Development Server
    python manage.py runserver

Visit the app at: http://127.0.0.1:8000



## ߓ Resources
- https://docs.djangoproject.com/en/5.1/

- https://pillow.readthedocs.io/
- https://django-extensions.readthedocs.io/

## ✅ Final Notes
- Always activate the environment before running the server.
- Use `python manage.py` commands inside the `BrainProject` folder.
- Admin login: http://127.0.0.1:8000/admin

Happy Coding! ߚ
