import express, {Express} from "express";
import session from 'express-session';
import bodyParser from "body-parser";
import sessionFileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import {setSessionIfNotExist} from "./no-auth-middleware.js";
import {ItemModel} from "../models/ItemModel.js";
import cors from "cors";
import {client} from "./user-repository.js";


declare module 'express-session' {
    interface SessionData {
        registered: boolean;
        login: string,
        pass: string,
        items: ItemModel[]
    }
}
export const app: Express = express();

const FileStore = sessionFileStore(session);
const port: number = 3005;

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
};

// export const client: MongoClient = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

//Connect
(async () => {
    try {
        await client.connect();
        console.log('successful connect to db');
    } catch (err) {
        console.log(err);
    }
})();


app.use(cors(corsOptions));
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


app.listen(port, () => {
    console.log(`server listen port: ${port}`);
});

