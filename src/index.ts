import {Request, Response, Express} from "express";
// import mongoose, { Schema, model, connect } from "mongoose";
import express from "express";
import session from 'express-session';
import {itemsRouter} from "./items-router.js";
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import {data} from "./data.js";
import {Item, UserModel} from "./user-model.js";
// import cors from "cors";


const FileStore = sessionFileStore(session);
const port: number = 3005;
const app: Express = express();
// app.options('*', cors());

declare module 'express-session' {
    interface SessionData {
        login: string,
        pass: string;
    }
}

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
    req.session.login = user.login;
    req.session.pass = user.pass;
    const items: Item[] = [];
    data.users.push({
        login: user.login,
        pass: user.pass,
        tasks: []
    });
    res.send({"ok": "true"});

});
app.post('/api/v1/login', (req: Request, res: Response) => {
    const user: { login: string, pass: string } = req.body;
    console.log(user);
    req.session.login = user.login;
    req.session.pass = user.pass;
    console.log(req.session);
    if (data.users.find((e) => e.login == user.login && e.pass == user.pass)) {
        res.send({"ok": "true"});
    } else {
        res.status(400).send({"error": "Login or password are incorrect"});
    }

});


app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html');
});


app.listen(port, () => {
    console.log(`server listen port: ${port}`);
})

