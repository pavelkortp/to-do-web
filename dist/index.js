// import mongoose, { Schema, model, connect } from "mongoose";
import express from 'express';
import session from 'express-session';
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import { setSessionIfExist } from "./no-auth-middleware.js";
// import cors from "cors";
const FileStore = sessionFileStore(session);
const port = 3005;
export const app = express();
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
app.use(setSessionIfExist);
app.use(express.static('front'));
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.listen(port, () => {
    console.log(`server listen port: ${port}`);
});
