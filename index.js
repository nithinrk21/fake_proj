const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// Create connection to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: '', // your MySQL password
    database: 'fake_db'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// API route to get data from MySQL
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/api/salaries', (req, res) => {
    const query = `
        SELECT users.name, salaries.salary 
        FROM users 
        JOIN salaries ON users.id = salaries.employee_id
    `;
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});


app.listen(5000, () => {
    console.log('Server running on port 5000');
});
