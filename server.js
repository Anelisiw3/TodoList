const http = require('http');
const fs = require('fs');

const express = require('express');
const cors = require('cors'); 
const { MongoClient, ObjectId } = require('mongodb'); 
const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://anelisiwemtatiam:2ouFw92f8X5tvBBT@cluster0.8h3i3.mongodb.net/';
const dbName = 'TodoList'; 
let db, tasksCollection;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.static('public')); 
app.use(express.json()); // For parsing JSON data in POST requests

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    mongodb: db ? 'Connected' : 'Not Connected'
  });
});

// Connect to MongoDB
async function connectDB() {
  try {
    const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    tasksCollection = db.collection('Todo_List');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

connectDB();

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await tasksCollection.find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ message: 'Error retrieving tasks', error });
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  const { task_list, task_time, completed = false } = req.body;

  if (!task_list || !task_time) {
    return res.status(400).json({ message: 'Task and time are required' });
  }

  try {
    const newTask = { task_list, task_time, completed };
    const result = await tasksCollection.insertOne(newTask);
    res.status(201).json({
      message: 'Task added successfully',
      task: { _id: result.insertedId, ...newTask },
    });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Error adding task', error });
  }
});

// Update a task's completion status
app.put('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { completed } = req.body;

  try {
    const result = await tasksCollection.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { completed: !!completed } }
    );

    if (result.matchedCount === 1) {
      res.status(200).json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task', error });
  }
});
