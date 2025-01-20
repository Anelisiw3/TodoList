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
app.use(express.json());

const pool = mysql.createPool(dbConfig);

const bodyParser = require('body-parser');

app.get('/tasks', async (req, res) => {
    try {
      const results = await pool.execute('SELECT * FROM tasks');
      res.json(results[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  });
  
  app.post('/tasks', async (req, res) => {
    try {
      const { task_list } = req.body;
      const results = await pool.execute(
        'INSERT INTO tasks (task_list) VALUES (?)',
        [task_list]
      );
      res.json({ id: results.insertId, task_list });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating a list' });
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
    const id = req.params.id;
      const { task_list } = req.body;
      await pool.execute(
        `UPDATE tasks SET task_list = ? WHERE id = ${id}`,
        [task_list]
      );
      res.json({ id, task_list });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating task' });
    }
  });
  
  app.delete('/tasks/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
      res.json({ message: 'task deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: 'task not found' });
    }
  });

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});