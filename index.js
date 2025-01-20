const express = require('express');
const fs = require('fs');
const path = require("path");
const app = express();
const port = 3700;

app.use(
    express.static('pubvixc')
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "tool.html"));
});

app.get('/', (req, res) => {
    fs.readFile('tool.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

// db.js
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Am@90084',
  database: 'mytodos',
};

const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool(dbConfig);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "tool.html"));
});

app.get('/tasks', async (req, res) => {
    try {
      const [tasks] = await pool.execute('SELECT * FROM tasks');
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  });
  
  app.post('/tasks', async (req, res) => {
    try {
      const { task_list } = req.body;
      const [results] = await pool.execute(
        'INSERT INTO tasks (task_list) VALUES (?)',
        [task_list, 0]
      );
      res.json({ id: results.insertId, task_list, completed: 0 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding a list' });
    }
  });


  
  app.get('/tasks/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [results] = await pool.execute(`SELECT * FROM tasks WHERE id = ?`, [id]);
      res.json(results[0]);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: 'task not found' });
    }
  });
  
  app.put('/tasks/:id', async (req, res) => {
    try {
    const {id} = req.params;
      const { completed } = req.body;
      await pool.execute( `UPDATE tasks SET completed = ? WHERE id = ?`, completed,
        id,
      );
    
      res.json({ id, completed });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating task' });
    }
  });
  
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});