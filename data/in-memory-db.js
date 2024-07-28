const users = [];
const newsCache = [];
const {JWT_SECRET, NEWS_API_KEY} = process.env;

// source: https://www.thenewsapi.com/documentation
const newsCategories = ['general', 'science', 'sports', 'business', 'health', 'entertainment', 'tech', 'politics', 'food', 'travel']
const NEWS_API_URL = 'https://api.thenewsapi.com/v1/news/all';


module.exports = { users, JWT_SECRET , newsCategories, NEWS_API_KEY, NEWS_API_URL, newsCache};

