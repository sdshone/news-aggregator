const { getNews } = require('../services/newsService');
const { users } = require('../data/in-memory-db')

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
