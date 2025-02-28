import "dotenv/config";
import express from "express";
import fs from "fs";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// reading file synchronosuly
// const taskData = JSON.parse(fs.readFileSync("./task.json", "utf8"));

// reading file asynchronously
let taskData;
fs.readFile("./task.json", "utf8", (err, data) => {
  if (err) throw err;
  taskData = JSON.parse(data);
});

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
  res.json(taskData);
});

// get single task by its id
app.get("/api/v1/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = taskData.tasks.find((task) => task.id === taskId);

  // handle if no task found
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(task);
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
  newTask.id = taskData.tasks.length + 1;
  newTask.completed = false; // setting the default completed status to false
  newTask.createdAt = new Date();
  newTask.updatedAt = new Date();

  // push the new task into the taskList
  taskData.tasks.push(newTask);
  res.json(newTask);
});

// update an existing task by its ID : use to change the status to completed
app.patch("/api/v1/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = taskData.tasks.find((task) => task.id === taskId);

  if (!task) {
    res.send(404).json({ error: "Task not found" });
    return;
  }

  task.completed = true;
  task.updatedAt = new Date();

  res.json(task);
});

// update an existing task by its ID: update the details of the task
app.put("/api/v1/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = taskData.tasks.find((task) => task.id === taskId);
  const updatedTask = req.body;

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  // update the necessary fields
  task.title = updatedTask.title;
  task.description = updatedTask.description;
  task.priority = updatedTask.priority;
  task.dueDate = updatedTask.dueDate;
  task.updatedAt = new Date();

  res.json(task);
});

// delete an existing task by its ID
app.delete("/api/v1/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = taskData.tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  taskData.tasks.splice(taskIndex, 1);
  res.json({ message: "Task deleted successfully" });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});
