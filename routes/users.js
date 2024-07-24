const express = require('express');
const userController = require('../controllers/users');
const validationHandler = require('../middleware/validationHandler');


const router = express.Router();

router.post('/register', 
    validationHandler,
    userController.register
);

module.exports = router;