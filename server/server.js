const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// API endpoint to handle search requests
app.get('/api/search', (req, res) => {
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