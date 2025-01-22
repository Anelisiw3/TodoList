const express = require('express');
const fs = require('fs');
const path = require("path");
const app = express();
const port = 3700;
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');



app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


  
// database connection
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Am@90084',
  database: 'mytodos',
};

const pool = mysql.createPool(dbConfig);

//server HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "tool.html"));
});

//Get all tasks
app.get('/tasks', async (req, res) => {
    try {
      const [tasks] = await pool.execute('SELECT * FROM tasks');
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  });
  
  // Add a new task
  app.post('/tasks', async (req, res) => {
    try {
      const { task_list, task_time } = req.body;
      const [results] = await pool.execute(
        'INSERT INTO tasks (task_list, task_time) VALUES (?, ?)',
        [task_list, task_time]
      );
      res.json({ id: results.insertId, task_list, task_time, completed: 0 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding a task' });
    }
  });
  
  
  //Get a task by ID
  app.get('/tasks/:id', async (req, res) => {
    try {
      const {id} = req.params.id;
      const [results] = await pool.execute(`SELECT * FROM tasks WHERE id = ?`, [id]);
      if (results.lenght === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(results[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'error fetching task'});
    }
  }); 
  
  //Update a task
  app.put('/tasks/:id', async (req, res) => {
    try {
    const {id} = req.params;
      const { completed } = req.body;
      if (completed === undefined) {
        return res
          .status(400)
          .json({ message: "Completed status is required" });
      }
      await pool.execute( `UPDATE tasks SET completed = ? WHERE id = ?`,
         [completed,id]
      );
    
      res.json({ id, completed });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating task' });
    }
  });
  
  //Delete a task
  app.delete('/tasks/:id', async (req, res) => {
    try {
      const {id} = req.params;
      await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
      res.json({ message: 'task deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'error deleting task' });
    }
  });

  //start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});