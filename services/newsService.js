const axios = require('axios');
const { NEWS_API_KEY, NEWS_API_URL, newsCategories, newsCache } = require('../data/in-memory-db');

// Calculate newsIdCounter after tasks are loaded
let newsIdCounter = newsCache.data.reduce((accumulator, news) => {
    return Math.max(accumulator, parseInt(news.id));
}, 0)+1; // Start counting from the next number

// Fetch news articles based on user preferences
exports.getNews = async (preferences) => {

    // Check if cache is fresh else make request to the API
    if (newsCache.data && 
        newsCache.lastUpdated > Date.now() - 3600000
    ) {
        const filteredArticles = newsCache.data.filter(article => {
            const articleCategories = article.categories;
            const userCategories = preferences.categories;
            return articleCategories.some(category => userCategories.includes(category));
            });

        if (filteredArticles.length >= 3){
            return filteredArticles
        }

    } 
    const { language = 'en', categories = 'general'} = preferences;
    const request_url = `${NEWS_API_URL}?api_token=${NEWS_API_KEY}&categories=${categories.join(',')}&language=${language}`;
    const response = await axios.get(request_url);
    let articles = response.data.data.map(article => ({
        id: newsIdCounter++,
        title: article.title,
        description: article.description,
        language: language,
        categories: article.categories,
    }));
    if (!newsCache.data){
        newsCache.data = []
    }
    newsCache.data.push(...articles);

    newsCache.lastUpdated = Date.now()
    return articles;

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
                await this.getNews(preferences);
            }
        }

        console.log('News cache updated', newsCache);
    } catch (err) {
        console.log('Error updating news cache:', err);
    }
};