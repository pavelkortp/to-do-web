import {Request, Response} from "express";
import {addUser, getUser} from "../src/user-repository.js";
import {UserModel} from "../models/UserModel.js";

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
    await setSession(req, true);
    await addUser(new UserModel(true, user.login, user.pass, []));
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
    await setSession(req, true);

    if (await getUser(user.login, user.pass)) {
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


/**
 * Updates user data in session.
 * @param req HTTP request in JSON format.
 * @param registered marks user as registered in db.
 */
export const setSession = async (req: Request, registered = false): Promise<void> => {
    req.session.registered = registered;
    req.session.login = req.body.login || 'anon';
    req.session.pass = req.body.pass || 'anon';
    req.session.items = req.session.items || [];
}
