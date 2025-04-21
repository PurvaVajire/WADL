const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const TaskSchema = new mongoose.Schema({
    text: String
});

const Task = mongoose.model("Task", TaskSchema);

// Add a task
app.post("/tasks", async (req, res) => {
    const newTask = new Task({ text: req.body.text });
    await newTask.save();
    res.json(newTask);
});

// Get all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
