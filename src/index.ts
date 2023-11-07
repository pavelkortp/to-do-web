import {Request, Response, Express} from "express";
// import mongoose, { Schema, model, connect } from "mongoose";
import express from 'express';
import session from 'express-session';
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import {setSessionIfExist} from "./no-auth-middleware";
// import cors from "cors";


const FileStore = sessionFileStore(session);
const port: number = 3005;
export const app: Express = express();

// app.options('*', cors());

declare module 'express-session' {
    interface SessionData {
        register: boolean;
        login: string,
        pass: string,
        items: Array<{ id: number, text: string, checked: boolean }>
    }
}

app.use(bodyParser.json());
app.use(setSessionIfExist);
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


app.get('/', async (req: Request, res: Response) => {
    res.sendFile('index.html');
});


app.listen(port, () => {
    console.log(`server listen port: ${port}`);
})

