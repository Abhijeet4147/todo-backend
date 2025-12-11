const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.get('/', todosController.getTodos);
router.post('/', todosController.createTodo);
router.put('/:id', todosController.updateTodo);
router.delete('/:id', todosController.deleteTodo);
router.patch('/:id/complete', todosController.toggleComplete);

module.exports = router; 