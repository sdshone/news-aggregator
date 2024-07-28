const axios = require('axios');
const { NEWS_API_KEY, NEWS_API_URL, newsCategories, newsCache } = require('../data/in-memory-db');

// Fetch news articles based on user preferences
exports.getNews = async (preferences) => {

    // Check if cache is fresh else make request to the API
    if (newsCache.data && newsCache.data.length && newsCache.lastUpdated > Date.now() - 3600000) {
        return newsCache.data.filter(article => preferences.categories.includes(article.category));
    } else {
        const { language = 'en', categories = 'general'} = preferences;
        const request_url = `${NEWS_API_URL}?api_token=${NEWS_API_KEY}&categories=${categories.join(',')}&language=${language}`;
        console.log(request_url);
        // return [];
        const response = await axios.get(request_url);
        return response.data.data;
    }
};

// Update news cache with articles for all users
exports.updateNewsCache = async () => {
    try {
        const allArticles = [];
        for (const category of newsCategories) {
            // replace this with supported languages in future
            for (const language of ['en']){
                const preferences = {
                    'categories':[category],
                    'language':language,
                }
                let articles = await this.getNews(preferences);
                articles = articles.map(article => ({
                    title: article.title,
                    description: article.description,
                    language: language,
                    category: category
                }));
                allArticles.push(...articles);
            }

        }
        newsCache.data = allArticles;
        newsCache.lastUpdated = new Date();
        console.log('News cache updated', newsCache);
    } catch (err) {
        console.log('Error updating news cache:', err);
    }
};