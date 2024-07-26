const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users, JWT_SECRET } = require('../data/in-memory-db');


exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });

        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500);
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(user => user.username === username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.sendStatus(403);
        }
        console.log(users);
        const token = jwt.sign({ username: user.username }, JWT_SECRET);
            res.json({ token });
        } catch (err) {
            res.sendStatus(500);
        }
};

exports.getPreferences = (req, res) => {
    try {
        const user = users.find(user => user.username === req.user.username);
        res.json(user.preferences);
    } catch (err) {
        res.sendStatus(500);
    }
};

exports.updatePreferences = (req, res) => {
    try {
        const user = users.find(user => user.username === req.user.username);
        user.preferences = req.body;
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
};
