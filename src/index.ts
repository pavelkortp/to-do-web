import {Request, Response, Express} from "express";
// import mongoose, { Schema, model, connect } from "mongoose";
import express from 'express';
import session from 'express-session';
import {itemsRouter} from "./items-router.js";
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import {data} from "./data.js";
import cookieParser from 'cookie-parser';


// import cors from "cors";


const FileStore = sessionFileStore(session);
const port: number = 3005;
const app: Express = express();
// app.options('*', cors());

declare module 'express-session' {
    interface SessionData {
        login: string,
        pass: string,
        items: Array<{ id: number, text: string, checked: boolean }>
    }
}

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

app.post('/api/v1/logout', (req: Request, res: Response) => {
    req.session.destroy((err: Error) => {
        if (err) {
            res.status(400).json({"error": "Logged out was unsuccessful"});
        } else {
            res.json({"ok": "true"});
        }
    });
});
app.post('/api/v1/register', (req: Request, res: Response) => {
    const user: { login: string, pass: string } = req.body;
    if (user.login == undefined || user.pass == undefined) {
        res.status(400).json({"error": "login or pass are undefined!"});
    }
    req.session.login = user.login;
    req.session.pass = user.pass;
    data.users.push({
        login: user.login,
        pass: user.pass,
        tasks: []
    });
    res.send({"ok": "true"});

});
app.post('/api/v1/login', (req: Request, res: Response) => {
    const user: { login: string, pass: string } = req.body;
    req.session.login = user.login;
    req.session.pass = user.pass;
    if (data.users.find((e) => e.login == user.login && e.pass == user.pass)) {
        res.send({"ok": "true"});
    } else {
        res.status(400).send({"error": "User not found, check your data"});
    }

});


app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html');
});


app.listen(port, () => {
    console.log(`server listen port: ${port}`);
})

