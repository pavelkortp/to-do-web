import {Request, Response, Express} from "express";
// import mongoose, { Schema, model, connect } from "mongoose";
import express from "express";
import session from 'express-session';
import {itemsRouter} from "./items-router.js";
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import {authRouter} from "./auth-router.js";
// import cors from "cors";


const FileStore = sessionFileStore(session);
const port: number = 3005;
const app: Express = express();
// app.options('*', cors());

app.use(bodyParser.json());
app.use(express.static('front'));
app.use('/api/v1/items', itemsRouter);
app.use('/api/v1', authRouter);
app.use(session({
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html');
});


app.listen(port, () => {
    console.log(`server listen port: ${port}`);
})
