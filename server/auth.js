const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const users = ["test"]; // This should be replaced with a proper database in a real application

const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3R1c2VyIiwiaWF0IjoxNzMzMTAyODYzLCJleHAiOjE3MzMxODkyNjN9.6ubBOYRg1hA2lf7_RCAPYdmQPC7N3lhuEHfuShnx9WU'; // Replace with your own secret key

const register = async (username, password) => {
    try {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const result = await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );
        console.log('User registered:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Error registering user');
    }
};

const login = async (username, password) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            throw new Error('User not found');
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours
        console.log('User logged in:', user);
        return { auth: true, token };
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Error logging in user');
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = { register, login, verifyToken };