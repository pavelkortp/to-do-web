// import mongoose, { Schema, model, connect } from "mongoose";
import express from 'express';
import session from 'express-session';
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import { login, logout, register } from "./auth-hendler.js";
import { createItem, deleteItem, editItem, getItems } from "./items-hendler.js";
// import cors from "cors";
const FileStore = sessionFileStore(session);
const port = 3005;
const app = express();
export { app };
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
app.post('/api/v2/router', async (req, res) => {
    console.log(req.query.action);
    switch (req.query.action) {
        case 'login':
            await login(req, res);
            break;
        case 'register':
            await register(req, res);
            break;
        case 'logout':
            await logout(req, res);
            break;
        case 'getItems':
            await getItems(req, res);
            break;
        case 'deleteItem':
            await deleteItem(req, res);
            break;
        case 'createItem':
            await createItem(req, res);
            break;
        case 'editItem':
            await editItem(req, res);
            break;
        default:
            res.status(400).json({ 'error': 'not found' });
    }
});
app.use(express.static('front'));
app.get('/', async (req, res) => {
    res.sendFile('index.html');
});
app.listen(port, () => {
    console.log(`server listen port: ${port}`);
});
