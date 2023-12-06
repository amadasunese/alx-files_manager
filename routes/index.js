const express = require('express');
const AppController = require('./controllers/AppController');
const UsersController = require('./controllers/UsersController');

const router = express.Router();

// GET endpoints
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// POST endpoints
router.post('/users', UsersController.postNew);

module.exports = router;
