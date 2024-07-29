const { newsCategories } = require('../data/in-memory-db')

exports.registerHandler = (req, res, next) => {
    
    const { name, email, password } = req.body;

    if (typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({ error: 'Name must be at least 3 characters long' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    if (typeof password !== 'string' || password.length < 5) {
        return res.status(400).json({ error: 'Password must be at least 5 characters long' });
    }
    next();
};

exports.preferencesHandler = (req, res, next) => {
    
    const { preferences } = req.body;
    if (!preferences){
        return res.status(400).json({ errors: ['Required: preferences'] });
    }
    const { categories } = preferences;
    err = null
    if (!Array.isArray(categories)) {
        err = 'Invalid input. Expected categories as list of interested categories'
    } else if (categories.length === 0 ) {
        err = 'Invalid input. Expected categories list cannot be empty'
    } else if (!categories.every(category => newsCategories.includes(category))) {
        err = `Invalid category sent. Valid categories ${newsCategories}`
    }

    if (err) {
        console.log(err)
        return res.status(400).json({ errors: [err] });
    }
    next();
};