import {Request, Response} from "express";
import {addUser, getUser} from "../src/user-repository.js";
import {UserModel} from "../models/UserModel.js";
import {ItemModel} from "../models/ItemModel";

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
    await setSession(req);
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
    await setSession(req);

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
 * @param req HTTP request in JSON format
 * @param customData obj which contains fields which need to set.
 */
export const setSession = async (req: Request, customData?: {
    registered?: boolean,
    login?: string,
    pass?: string,
    items?: ItemModel[]
}): Promise<void> => {

    if (!customData) {
        req.session.registered = true;
        req.session.login = req.body.login;
        req.session.pass = req.body.pass;
    } else {
        req.session.registered = customData.registered || req.session.registered;
        req.session.login = customData.login || req.session.login;
        req.session.pass = customData.pass || req.session.pass;
        req.session.items = customData.items || req.session.items;
    }

}
