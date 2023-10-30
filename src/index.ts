import { Request, Response, Express } from "express";

const express = require('express');
const data = require('./data');
const app: Express = express();
const port: number = 3000;
const cors = require('cors');

app.use(express.json());

app.get('/api/channel', (req: Request, res: Response) => {
    res.json(data);
    console.log('GET', data.channels);
});

app.get('/api/channel/:id', (req: Request, res: Response) => {
    let obj = data.channels.find((e: { id: number }) => e.id == parseInt(req.params.id));
    if (obj == null) {
        res.status(404).end();
        return;
    }
    res.json(obj);
    console.log('GET', obj);
});

app.post('/api/channel', (req: Request, res: Response) => {
    let { name } = req.body;
    console.log(req.body);
    let id = data.channels.reduce((prev: number, curr: { id: number }) => {
        return prev < curr.id ? curr.id : prev
    }, 0) + 1;
    const last_update = Date.now();
    const obj = { id, name, last_update };
    data.channels.push(obj);
    res.status(201).json(obj);
    console.log('POST', obj);
});

app.options('/api/channel', (req: Request, res: Response) => {
    res.status(200);
    res.set('Allow', 'GET, POST, HEAD, OPTIONS');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Lenght', '0');
    res.end();
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});