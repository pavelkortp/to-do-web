// import mongoose, { Schema, model, connect } from "mongoose";
import express from 'express';
import session from 'express-session';
import { itemsRouter } from "./items-router.js";
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import { data } from "./data.js";
import cookieParser from 'cookie-parser';
// import cors from "cors";
const FileStore = sessionFileStore(session);
const port = 3005;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(express.static('front'));
app.use('/api/v1/items', itemsRouter);
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
    if (user.login == undefined || user.pass == undefined) {
        res.status(400).json({ "error": "login or pass are undefined!" });
    }
    req.session.login = user.login;
    req.session.pass = user.pass;
    data.users.push({
        login: user.login,
        pass: user.pass,
        tasks: []
    });
    res.send({ "ok": "true" });
});
app.post('/api/v1/login', (req, res) => {
    const user = req.body;
    req.session.login = user.login;
    req.session.pass = user.pass;
    if (data.users.find((e) => e.login == user.login && e.pass == user.pass)) {
        res.send({ "ok": "true" });
    }
    else {
        res.status(400).send({ "error": "User not found, check your data" });
    }
});
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.listen(port, () => {
    console.log(`server listen port: ${port}`);
});
