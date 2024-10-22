const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.status(200).send(`Hello, ${name}!`);
});

module.exports = app; 
