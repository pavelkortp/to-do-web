import express from 'express';
import session from 'express-session';
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import { setSessionIfNotExist } from "./no-auth-middleware.js";
import { MongoClient, ServerApiVersion } from "mongodb";
import { uri } from "../config.js";
// import cors from "cors";
export const app = express();
const FileStore = sessionFileStore(session);
const port = 3005;
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
(async () => {
    try {
        await client.connect();
        console.log('successful connect to db');
    }
    catch (err) {
        console.log(err);
    }
})();
app.use(express.static('front'));
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
app.use(setSessionIfNotExist);
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.listen(port, () => {
    console.log(`server listen port: ${port}`);
});
