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
        console.log(err);
    }
};