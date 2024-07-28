const { getNews } = require('../services/newsService');
const { users } = require('../data/in-memory-db')

// Get news based on user preferences
exports.getNews = async (req, res) => {
    try {
        let {username} = req.user;
        console.log(users, username)
        const user = users.find(user => user.username === username);
        const news = await getNews(user.preferences);
        res.json(news);
    } catch (err) {
        console.log(err);
    }
};
