
/**
 * Handle validation errors
 */
module.exports = (req, res, next) => {
    
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