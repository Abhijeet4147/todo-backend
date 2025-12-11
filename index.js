require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const todosRouter = require('./routes/todos');
const authRouter = require('./routes/auth');

app.use('/api/todos', todosRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Todo API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Testing Automation Final 1234
// Testing Automation Final 12345678