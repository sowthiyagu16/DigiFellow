const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { register, login, verifyToken } = require('./auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Authentication routes
app.post('/api/register', async (req, res) => {
    try {
        const user = await register(req.body.username, req.body.password);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Secure API endpoint
app.get('/api/search', verifyToken, (req, res) => {
    const { department, query } = req.query;
    console.log(`Department: ${department}, Query: ${query}`);
    const results = [
        { name: 'Apple', department: 'electronics' },
        { name: 'Banana', department: 'groceries' },
        { name: 'Strawberry', department: 'groceries' }
    ]; // Replace with actual search logic
    res.json(results);
});

// Handle all other GET requests to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});