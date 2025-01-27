## Todo List Application

This is a full-stack Todo List application built with Node.js, Express, MongoDB, and a simple frontend. The application allows users to:

View a list of tasks.

Add new tasks with a description and a specific time.

Mark tasks as completed or incomplete.

Delete tasks.

## Features

## Backend

RESTful API: Provides endpoints to create, read, update, and delete tasks.

MongoDB Integration: Stores tasks in a MongoDB collection.

CORS Enabled: Ensures the API can be accessed from different origins.

Static File Serving: Hosts the frontend files.

## Frontend

Dynamic Rendering: Fetches and displays tasks from the backend.

Task Actions: Users can add, mark as complete, and delete tasks via buttons.

Responsive Design: Ensures usability on various devices.

## Technologies Used

## Backend

Node.js: JavaScript runtime.

Express: Web application framework.

MongoDB: Database for storing tasks.

cors: Middleware for enabling CORS.

## Frontend

HTML5, CSS3, and JavaScript for the user interface.

Font Awesome for icons.

Setup Instructions

Prerequisites

Node.js installed on your system.

A MongoDB database (local or cloud-hosted, e.g., MongoDB Atlas).

## 1. Clone the Repository

git clone https://github.com/yourusername/todolist-app.git
cd todolist-app

## 2. Install Dependencies

npm install

## 3. Configure Environment Variables

Create a .env file in the root directory and add the following:

MONGO_URL=your_mongodb_connection_string
PORT=3000

Replace your_mongodb_connection_string with your MongoDB URI.

## 4. Run the Application

node server.js

The server will start at http://localhost:3000.

API Endpoints

## GET /api/tasks

Retrieve all tasks.

Response: Array of task objects.

## POST /api/tasks

Add a new task.

Body:

{
  "task_list": "Task description",
  "task_time": "HH:MM",
  "completed": false
}

Response: Newly created task.

## PUT /api/tasks/:id

Update the completion status of a task.

Body:

{
  "completed": true
}

Response: Success message.

## DELETE /api/tasks/:id

Delete a task by ID.

Response: Success message.

## Frontend Instructions

Access the Application

Open the index.html file in the public directory using a live server (e.g., VS Code Live Server) or host it on a local HTTP server:

npx http-server public -p 8080

Visit http://localhost:8080 in your browser.

Interacting with the App

Add a task using the input fields for description and time.

Mark tasks as completed using the check button.

Delete tasks using the trash button.

## Deployment

Backend Deployment:

Host the server on platforms like Render, Heroku, or AWS Elastic Beanstalk.

## Frontend Deployment:

Use platforms like Netlify or Vercel.

Update the apiUrl in the frontend JavaScript to point to the deployed backend.

## Project Structure

|-- public
|   |-- index.html       # Frontend HTML file
|   |-- style.css        # Frontend styles
|-- server.js            # Backend server
|-- package.json         # Dependencies and scripts
|-- .env                 # Environment variables

## Future Enhancements

Add user authentication to secure the app.

Add categories or tags for tasks.

Implement drag-and-drop sorting for tasks.

Improve the UI with animations and transitions.

## License

This project is licensed under the MIT License.

