# To-Do App

## Description
This is a responsive application designed to create a simple to-do list using React and Django.

## Project Structure
- **Backend**: The backend of the app is located in the `main` directory. The API is defined in `todo/views.py`.
- **Frontend**: The frontend of the application is located in the `frontend` directory. Most of the logic is in `src/pages/Home.js` and `src/components/AddTask.js`. The CSS file is located in `src/index.css`.

## Installation

### Backend Setup

#### Windows
If you don't have a virtual environment set up, you can create one with the following commands:
```bash
pip install virtualenv
virtualenv env
env\scripts\activate
pip install -r requirements.txt
```
#### MAC/Linux
```pip install virtualenv
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```
#### Testing the application
- **Backend**:
```
cd main
py manage.py runserver
```
- **Frontend**:
```
cd frontend
npm start
```
