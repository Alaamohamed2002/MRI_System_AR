MRI System – Django Web Project
=======================================

📁 Project Overview
---------------------------------------
This is a Django-based MRI analysis web application that allows doctors to upload MRI images and manage patient data. The system supports Arabic localization and features custom login using name and national ID.

---------------------------------------
🚀 Setup Instructions
---------------------------------------

1. Clone the Repository
------------------------------
    git clone https://github.com/Alaamohamed2002/MRI_System_AR.git
    

2. Create and Activate a Virtual Environment
------------------------------
If `env` folder doesn't exist, create it:

    python -m venv env

Activate the environment:

    On Windows:
        env\Scripts\activate
    On macOS/Linux:
        source env/bin/activate

3. Install Dependencies
------------------------------
Install the required packages:

    pip install django
    pip install pillow
    pip install django-extensions


---------------------------------------
🌐 Arabic Localization (i18n)
---------------------------------------
If you're using Django translation files (`.po`, `.mo`) for Arabic language support:

✔ Make sure `gettext` is installed on your system if you need to recompile translations.

📥 Download gettext (Windows):
https://mlocati.github.io/articles/gettext-iconv-windows.html

🛠 Add gettext `bin` folder to your system PATH.

✅ To compile translations (if needed):

    python manage.py compilemessages

📌 Note: This is only required if `.mo` files are missing or `.po` files are updated.

---------------------------------------
🛠 Run the Development Server
---------------------------------------

    python manage.py runserver

Then open your browser and go to:

    http://127.0.0.1:8000/

---------------------------------------
🧠 Project Structure Highlights
---------------------------------------

- `Brainapp/`        – main Django app (models, views, etc.)
- `templates/`       – HTML template files
- `locale/`          – translation files (Arabic `.po`/`.mo`)
- `media/`           – uploaded MRI image files
- `frontend/`        – optional React frontend (if applicable)



