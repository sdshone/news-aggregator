const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users, JWT_SECRET } = require('../data/in-memory-db');


exports.register = async (req, res) => {
    try {
        const { name, email, password, preferences } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({ name, email, password: hashedPassword, preferences, readArticles: [], favoriteArticles: [] });
        res.status(201).json({'msg': 'User registered successfully!'});
    } catch (err) {
        console.log(err);
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(user => user.email === email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.sendStatus(401);
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET);
            res.json({ token });
        } catch (err) {
            res.sendStatus(500);
        }
};

exports.getPreferences = (req, res) => {
    try {
        const user = users.find(user => user.email === req.user.email);
        res.json({preferences:user.preferences});
    } catch (err) {
        res.sendStatus(500);
    }
};

exports.updatePreferences = (req, res) => {
    try {
        const user = users.find(user => user.email === req.user.email);
        user.preferences = req.body.preferences;
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
};
