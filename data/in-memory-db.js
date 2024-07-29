const users = [];
const {JWT_SECRET, NEWS_API_KEY} = process.env;

// source: https://www.thenewsapi.com/documentation
const newsCategories = ['general', 'science', 'sports', 'business', 'health', 'entertainment', 'tech', 'politics', 'food', 'travel']
const NEWS_API_URL = 'https://api.thenewsapi.com/v1/news/all';

const newsCache = {
    data: [
        {"id":0,
        "title":"Commuters stranded on KZN South Coast amid taxi, bus operators' strike",
        "description":"Commuters on the KwaZulu-Natal South Coast were left stranded on Monday after taxi and bus operators embarked on another strike, demanding an urgent resolution ...",
        "language":"en","categories":["general"]},
        {"id":1,
        "title":"Paris 2024 | Chinese enthusiasm for Olympics soars",
        "description":"","language":"en",
        "categories":["general"]},
        {"id":2,
        "title":"Rapido Raises $120 Million At $1-Billion Valuation, Mints India's Third Unicorn In 2024",
        "description":"Rapido, the bike taxi major, has turned unicorn after a fresh funding round of Rs 1,000 crore or about $120 million from existing investor WestBridge Capital. T...",
        "language":"en",
        "categories":["business","general"]}],
    lastUpdated: '1722275226606',
}

module.exports = { users, JWT_SECRET , newsCategories, NEWS_API_KEY, NEWS_API_URL, newsCache};

