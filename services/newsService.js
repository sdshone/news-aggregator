const axios = require('axios');
const { NEWS_API_KEY, NEWS_API_URL } = require('../data/in-memory-db');


// Fetch news articles based on user preferences
exports.getNews = async (preferences) => {

    const { language = 'en', categories = 'general'} = preferences;
    const request_url = `${NEWS_API_URL}?api_token=${NEWS_API_KEY}&categories=${categories.join(',')}&language=${language}`;
    console.log(request_url);
    const response = await axios.get(request_url);
    return response.data.data;
};
