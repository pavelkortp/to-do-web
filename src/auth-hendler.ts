import {Request, Response} from "express";
import {data} from "./data.js";
import {getUser} from "./user-repository.js";

/**
 * Takes data from response body and creates new user.
 * @param req HTTP request.
 * @param res HTTP response.
 */
export async function register(req: Request, res: Response): Promise<void> {
    const user: { login: string, pass: string } = req.body;
    if (user.login == undefined || user.pass == undefined) {
        res.status(400).json({"error": "not found"});
    }
    req.session.login = user.login;
    req.session.pass = user.pass;
    data.users.push({
        login: user.login,
        pass: user.pass,
        tasks: []
    });
    res.send({"ok": "true"});
}

/**
 * Takes data from response body and verify the user
 * @param req HTTP request with JSON data in body.
 * @param res HTTP response JSON (ok or error).
 */
export async function login(req: Request, res: Response): Promise<void> {
    const user: { login: string, pass: string } = req.body;
    // Set session for user
    req.session.login = user.login;
    req.session.pass = user.pass;

    if (await getUser(user.login, user.pass)) {
        res.json({"ok": "true"});
    } else {
        res.status(400).json({"error": "not found"});
    }
}

/**
 * Destroy user's session.
 * @param req HTTP request.
 * @param res HTTP response JSON (ok or error).
 */
export async function logout(req: Request, res: Response): Promise<void> {
    req.session.destroy((err: Error) => {
        if (err) {
            res.status(400).json({"error": "not found"});
        } else {
            res.json({"ok": "true"});
        }
    });
}

