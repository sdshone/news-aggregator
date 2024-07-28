const express = require('express');
const newsController = require('../controllers/news');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, newsController.getNews);

module.exports = router;