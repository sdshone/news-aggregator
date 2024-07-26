const { newsCategories } = require('../data/in-memory-db')
exports.registerHandler = (req, res, next) => {
    
    const { username, password } = req.body;
    const errors = [];
    if (username.length < 5) {
        errors.push('username length should be at least 5 characters.')
    }

    if (password.length < 5 ) {
        errors.push('password length should be at least 5 characters.')
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
    }
    next();
};

exports.preferencesHandler = (req, res, next) => {
    
    const { categories } = req.body;
    error = null
    if (!Array.isArray(categories)) {
        error = 'Invalid input. Expected categories as list of interested categories'
    } else if (categories.length === 0 ) {
        error = 'Invalid input. Expected categories list cannot be empty'
    } else if (!categories.every(category => newsCategories.includes(category))) {
        error = `Invalid category sent. Valid categories ${newsCategories}`
    }
    console.log(error);

    if (error) {
        return res.status(400).json({ errors: [error] });
    }
    next();
};