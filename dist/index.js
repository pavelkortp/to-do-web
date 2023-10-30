const express = require('express');
const data = require('./data');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
app.get('/api/channel', (req, res) => {
    res.json(data);
    console.log('GET', data.channels);
});
app.get('/api/channel/:id', (req, res) => {
    let obj = data.channels.find((e) => e.id == parseInt(req.params.id));
    if (obj == null) {
        res.status(404).end();
        return;
    }
    res.json(obj);
    console.log('GET', obj);
});
app.post('/api/channel', (req, res) => {
    let { name } = req.body;
    console.log(req.body);
    let id = data.channels.reduce((prev, curr) => {
        return prev < curr.id ? curr.id : prev;
    }, 0) + 1;
    const last_update = Date.now();
    const obj = { id, name, last_update };
    data.channels.push(obj);
    res.status(201).json(obj);
    console.log('POST', obj);
});
app.options('/api/channel', (req, res) => {
    res.status(200);
    res.set('Allow', 'GET, POST, HEAD, OPTIONS');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Lenght', '0');
    res.end();
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
