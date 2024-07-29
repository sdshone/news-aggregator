const express = require('express');
const newsController = require('../controllers/news');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, newsController.getNews);

router.post('/:id/read', authenticateToken, newsController.markAsRead);

router.post('/:id/favorite', authenticateToken, newsController.markAsFavorite);

router.get('/read', authenticateToken, newsController.getReadArticles);

router.get('/favorites', authenticateToken, newsController.getFavoriteArticles);

module.exports = router;