// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define the task model
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'pending' },
    priority: { type: String, default: 'low' },
    dueDate: { type: Date }
});

const Task = mongoose.model('Task', taskSchema);

// API Endpoints
app.post('/api/tasks', authenticate, (req, res) => {
    const task = new Task(req.body);
    task.save((err, task) => {
        if (err) return res.status(400).send(err);
        res.send(task);
    });
});

app.get('/api/tasks', authenticate, (req, res) => {
    Task.find().then(tasks => res.send(tasks)).catch(err => res.status(400).send(err));
});

app.put('/api/tasks/:taskId', authenticate, (req, res) => {
    Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true }, (err, task) => {
        if (err) return res.status(400).send(err);
        res.send(task);
    });
});

app.delete('/api/tasks/:taskId', authenticate, (req, res) => {
    Task.findByIdAndRemove(req.params.taskId, (err, task) => {
        if (err) return res.status(400).send(err);
        res.send(task);
    });
});

// Authentication middleware
function authenticate(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

app.listen(3001, () => console.log('Server running on port 3001'));

// backend/server.js (continued)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/api/auth/signup', (req, res) => {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(user.password, 10);
    user.save((err, user) => {
        if (err) return res.status(400).send(err);
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.send({ token });
    });
});

app.post('/api/auth/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) return res.status(400).send('Invalid email or password.');
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isValidPassword) return res.status(400).send('Invalid email or password.');
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.send({ token });
    });
});