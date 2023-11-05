// import mongoose, { Schema, model, connect } from "mongoose";
import express from "express";
import session from 'express-session';
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import { data } from "./data.js";
// import cors from "cors";
const FileStore = sessionFileStore(session);
const port = 3005;
const app = express();
app.use(bodyParser.json());
app.use(session({
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60
    }
}));
app.use(express.static('front'));
// app.use('/api/v1/items', itemsRouter);
app.post('/api/v1/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).json({ "error": "Logged out was unsuccessful" });
        }
        else {
            res.json({ "ok": "true" });
        }
    });
});
app.post('/api/v1/register', (req, res) => {
    const user = req.body;
    req.session.login = user.login;
    req.session.pass = user.pass;
    const items = [];
    data.users.push({
        login: user.login,
        pass: user.pass,
        tasks: []
    });
    res.send({ "ok": "true" });
});
app.post('/api/v1/login', (req, res) => {
    const user = req.body;
    console.log(user);
    req.session.login = user.login;
    req.session.pass = user.pass;
    console.log(req.session);
    if (data.users.find((e) => e.login == user.login && e.pass == user.pass)) {
        res.send({ "ok": "true" });
    }
    else {
        res.status(400).send({ "error": "Login or password are incorrect" });
    }
});
app.get('/api/v1/items', (req, res) => {
    var _a;
    console.log(req.session);
    const login = req.session.login;
    console.log(login);
    res.send((_a = data.users.find((e) => e.login == login)) === null || _a === void 0 ? void 0 : _a.tasks);
});
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.listen(port, () => {
    console.log(`server listen port: ${port}`);
});
export { app };
