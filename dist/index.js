const express = require('express');
const data = require('./data');
const app = express();
const port = 3005;
const cors = require('cors');
const itemRouter = require('./items');
app.use(express.static('front'));
app.use(express.json());
app.use('/items', itemRouter);
app.get('/', (req, res) => {
    res.sendFile('index.html');
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
app
    .route('/api/channel')
    .get((req, res) => {
    res.json(data);
    console.log('GET', data.channels);
})
    .post((req, res) => {
    let { name } = req.body;
    console.log(req.body);
    let id = data.channels.reduce((acc, curr) => {
        return acc < curr.id ? curr.id : acc;
    }, 0) + 1;
    const last_update = Date.now();
    const obj = { id, name, last_update };
    data.channels.push(obj);
    res.status(201).json(obj);
    console.log('POST', obj);
})
    .options((req, res) => {
    res.status(200);
    res.set('Allow', 'GET, POST, HEAD, OPTIONS');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Lenght', '0');
    res.end();
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


