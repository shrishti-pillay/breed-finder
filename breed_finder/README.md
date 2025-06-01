# Breed Finder

Breed Finder is a Django-based web application that helps users search for and identify animal breeds. The project uses the [semantic images search](https://github.com/shrishti-pillay/semantic-image-search) package in another repository that I worked on.

## Features

- Search interface for users to input prompts and find breeds
- Modular Django app structure for easy maintenance and scalability

## Current works in progress

1. Updating css file for styling.
2. Show more than 1 results for prompts
3. Allow users to upload images as input as well. 

## Project Structure

```
breed_finder/
├── breed_finder/        # Django project settings and configuration
│   ├── __init__.py
│   ├── .env
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── home/                # Main application logic
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   ├── static/
│   └── templates/
├── db.sqlite3           # SQLite database
├── manage.py            # Django management script
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd breed_finder
   ```

2. **Create and activate a virtual environment:**
   ```sh
   python3 -m venv dev
   source dev/bin/activate
   ```

3. **Install dependencies:**
   ```sh
   pip install django
   ```

4. **Apply migrations:**
   ```sh
   python manage.py migrate
   ```

5. **Run the development server:**
   ```sh
   python manage.py runserver
   ```

6. **Access the app:**
   Open your browser and go to [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## Usage

- Enter a breed prompt in the search interface and click "Search" to find matching breeds.

## Current works in progress

1. Updating css file for styling.
2. Show more than 1 results for prompts
3. Allow users to upload images as input as well. 