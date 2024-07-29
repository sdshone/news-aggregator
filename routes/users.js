const express = require('express');
const userController = require('../controllers/users');
const validationHandler = require('../middleware/validationHandler');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', 
    validationHandler.registerHandler,
    validationHandler.preferencesHandler,
    userController.register
);

router.post('/login', userController.login);

router.get('/preferences', authenticateToken, userController.getPreferences);

router.put('/preferences', 
authenticateToken,
validationHandler.preferencesHandler,
userController.updatePreferences
);

module.exports = router;