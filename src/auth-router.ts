import {Request, Response} from "express";
import express from "express";
import session from 'express-session';
import sessionFileStore from 'session-file-store';

declare module 'express-session' {
    interface SessionData {
        login: string;
        pass: string;
    }
}

const authRouter = express.Router();

export {authRouter};

authRouter
    .post('/register', (req: Request, res: Response) => {
        const user: { login: string, pass: string } = req.body;
        req.session.login = user.login;
        req.session.pass = user.pass;

        res.json({"ok": "true"});

    })
    .post('/logout ', (req: Request, res: Response) => {
        req.session.destroy((err: Error) => {
            res.json({"error": "Logged out was unsuccessful"});
            return;
        });
        res.json({"ok": "true"});

    })
    .post('/login', (req: Request, res: Response) => {

    });
