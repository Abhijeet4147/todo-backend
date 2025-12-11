const Todo = require('../models/Todo');

// Get all todos for the logged-in user
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new todo for the logged-in user
exports.createTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const todo = new Todo({ title, description, status, user: req.user.id });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// Update a todo (only if it belongs to the user)
exports.updateTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, description, status },
            { new: true }
        );
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// Delete a todo (only if it belongs to the user)
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID' });
    }
};

// Toggle completed (only if it belongs to the user)
exports.toggleComplete = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID' });
    }
}; 