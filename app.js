const express = require("express");
const app = express();
const port = 3000;

const taskList = require("./task");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
Task Schema
{
  id: String,
  title: String,
  description: String,
  dueDate: Date,
  completed: Boolean,
  priority: String,
  createdAt: Date,
  updatedAt: Date,
}
*/

// get all the tasks
app.get("/api/v1/tasks", (req, res) => {
  res.json(taskList);
});

// create a new task
app.post("/api/v1/tasks", (req, res) => {
  const newTask = req.body;

  // validation for the title and description
  if (!newTask.title || !newTask.description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  // population of the task object
  newTask.id = taskList.tasks.length + 1;
  newTask.completed = false; // setting the default completed status to false
  newTask.createdAt = new Date();
  newTask.updatedAt = new Date();

  // push the new task into the taskList
  taskList.tasks.push(newTask);
  res.json(newTask);
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
