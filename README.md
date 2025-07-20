# Recipe Formula Application
This application is intended to be a recipe organizer to assist with the following tasks

## Setup Instructions

### Servers
The application relies on two servers: a Django server for storing recipe formula data, and a React application server for the frontend.
Both need to be running for the application to be accessible.

#### Django Server
Run the Django server from the directory `recipe_back/` with the following command: 

```
python manage.py runserver
```

#### Frontend React Server

Run the React server in development with the following command:
```
npm run dev
```

### Using the Application
You can access the frontend of the application from the address: 

http://localhost:3000
## Features

### 1. Recipe Formulas

### 2. 

## Notes

### Django

* Django ForeignKeys are Objects, *not* primary keys. So they should be named accordingly (i.e. without _id suffix)
