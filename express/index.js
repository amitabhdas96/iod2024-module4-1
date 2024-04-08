const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;

const todos = [
  { id: 1, title: 'Buy groceries' },
  { id: 2, title: 'Do laundry' },
];

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const tempTodo = req.body;
  const id = Math.max(...todos.map((t) => t.id)) + 1;
  const newTdo = { ...tempTodo, id: id };
  todos.push(newTdo);
  res.status(201).json(newTdo);
});

// PUT (update) an existing todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  const found = todos.map((todo) => todo.id).indexOf(id);
  todos.splice(found, 1, updatedTodo);
  res.json(updatedTodo);
});

// DELETE a todo by id
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const found = todos.map((todo) => todo.id).indexOf(id);
  todos.splice(found, 1);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening
  at http://localhost:${port}`);
});
