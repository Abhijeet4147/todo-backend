const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Blocked', 'Done'],
        default: 'To Do',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema); 