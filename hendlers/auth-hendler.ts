import {Request, Response} from "express";
import {addUserToFile, getUserFromFile, getUserFromObj} from "../src/user-repository.js";

/**
 * Takes data from response body and creates new user.
 * @param req HTTP request.
 * @param res HTTP response.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    const user: { login: string, pass: string } = req.body;
    if (!user.login || !user.pass) {
        res.status(400).json({'error': 'not found'});
        return;
    }
    req.session.registered = true;
    req.session.login = user.login;
    req.session.pass = user.pass;
    await addUserToFile({
        registered: true,
        login: user.login,
        pass: user.pass,
        items: []
    })
    res.send({'ok': true});
};

/**
 * Takes data from response body and verify the user
 * @param req HTTP request with JSON data in body.
 * @param res HTTP response JSON (ok or error).
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    const user: { login: string, pass: string } = req.body;
    // Set session for user
    req.session.registered = true;
    req.session.login = user.login;
    req.session.pass = user.pass;

    if (await getUserFromFile(user.login, user.pass)) {
        req.session.items;
        res.json({'ok': true});
    } else {
        res.status(400).json({'error': 'not found'});
    }
};

/**
 * Destroy user's session.
 * @param req HTTP request.
 * @param res HTTP response JSON (ok or error).
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
    req.session.destroy((err: Error) => {
        if (err) {
            res.status(400).json({'error': 'not found'});
        } else {
            res.json({'ok': true});
        }
    });
};
