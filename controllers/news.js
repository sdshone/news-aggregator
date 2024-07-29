const { getNews } = require('../services/newsService');
const { users, newsCache } = require('../data/in-memory-db')

// Get news based on user preferences
exports.getNews = async (req, res) => {
    try {
        let {email} = req.user;
        const user = users.find(user => user.email === email);
        const news = await getNews(user.preferences);
        res.json({news: news});
    } catch (err) {
        console.log(err);
    }
};


//Mark an article as read
exports.markAsRead = (req, res) => {
    try {
        const {email} = req.user;
        const articleId = req.params.id;
        const user = users.find(user => user.email === email);
        if (!user.readArticles.includes(articleId)) {
            user.readArticles.push(parseInt(articleId));
        }
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};


//Mark an article as favorite
exports.markAsFavorite = (req, res) => {
    try {
        const {email} = req.user;
        const articleId = req.params.id;
        const user = users.find(user => user.email === email);
        if (!user.favoriteArticles.includes(articleId)) {
            user.favoriteArticles.push(parseInt(articleId));
        }
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};

//Get all read articles

exports.getReadArticles = (req, res) => {
    try {
        const {email} = req.user;
        const user = users.find(user => user.email === email);
        const result = newsCache.data.filter(article => user.readArticles.includes(article.id));
        res.json(result);
    } catch (err) {
        console.log(err);
    }
};


//Get all favorite articles
exports.getFavoriteArticles = (req, res) => {
    try {
        const {email} = req.user;
        const user = users.find(user => user.email === email);
        const result = newsCache.data.filter(article => user.favoriteArticles.includes(article.id));
        res.json(result);
    } catch (err) {
        console.log(err);
    }
};