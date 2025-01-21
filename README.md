## Todo List Application

## Overview

This is a simple Todo List application built with:

Frontend: HTML, CSS, and JavaScript (with Font Awesome for icons)

Backend: Node.js with Express.js

Database: MySQL

The application allows users to:

Add new tasks

Mark tasks as completed

Delete tasks

View a list of tasks

## Features

Add Task: Users can add tasks via an input field and submit them to the backend.

Mark as Complete: Tasks can be marked as complete or incomplete by toggling their status.

Delete Task: Users can delete tasks they no longer need.

Persistent Storage: Tasks are stored in a MySQL database to ensure data is not lost when the application restarts.

## Prerequisites

Ensure you have the following installed:

Node.js (v14 or higher)

MySQL

## Setup Instructions

1. Clone the Repository

git clone <repository-url>
cd <repository-folder>

2. Install Dependencies

Install the required Node.js packages:

npm install

3. Set Up the Database

a. Create the Database

Log in to your MySQL server and create a new database:

CREATE DATABASE mytodos;
USE mytodos;

b. Create the tasks Table

Run the following SQL script to create the tasks table:

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_list VARCHAR(255) NOT NULL,
  completed TINYINT(1) DEFAULT 0
);

4. Configure Database Connection

Edit the dbConfig object in the index.js file to match your MySQL credentials:

const dbConfig = {
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'mytodos',
};

5. Start the Backend Server

Start the Node.js server:

node index.js

You should see a message like:

Server running at http://localhost:3700

6. Open the Application

Open a web browser and navigate to:

http://localhost:3700

## File Structure

.
├── index.js             # Backend server code
├── tool.html            # Frontend HTML file
├── public/
│   ├── style.css        # Frontend CSS
│   ├── app.js           # Frontend JavaScript
├── package.json         # Node.js dependencies
└── README.md            # Project documentation

API Endpoints

GET /tasks

Retrieve all tasks.
Response:

[
  {
    "id": 1,
    "task_list": "Buy groceries",
    "completed": 0
  }
]

POST /tasks

Add a new task.
Request Body:

{
  "task_list": "New Task"
}

Response:

{
  "id": 2,
  "task_list": "New Task",
  "completed": 0
}

PUT /tasks/:id

Update the completion status of a task.
Request Body:

{
  "completed": 1
}

Response:

{
  "id": 1,
  "completed": 1
}

DELETE /tasks/:id

Delete a task by ID.
Response:

{
  "message": "task deleted successfully"
}

Common Issues and Solutions

1. Database Connection Errors

Ensure the MySQL server is running.

Verify the credentials in the dbConfig object.

2. "Unknown column 'completed'"

Ensure the tasks table has a completed column. Run:

ALTER TABLE tasks ADD completed TINYINT(1) DEFAULT 0;

3. Tasks Not Displaying

Check if the frontend is properly fetching tasks from the backend.

Use browser developer tools to inspect network requests.

## Future Improvements

Add user authentication.

Implement task categories.

Add due dates and reminders for tasks.

## License

This project is open-source and available under the MIT License.

