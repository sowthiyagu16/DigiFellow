const { Pool } = require('pg');

const pool = new Pool({
    user: 'labuser',
    host: 'localhost',
    database: 'digifellow',
    password: 'password',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};