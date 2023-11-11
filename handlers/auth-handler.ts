import {Request, Response} from 'express';
import {addUser, checkLogin, getUser} from '../src/user-repository.js';
import {UserModel} from '../models/UserModel.js';
import {IUser} from '../models/IUser.js';

/**
 * Takes data from response body and creates new user.
 * @param req HTTP request.
 * @param res HTTP response.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    const user: { login: string, pass: string } = req.body;
    if (await checkLogin(user.login)) {
        res.status(400).json({'error': 'user with current login already exist'});
        return;
    }
    const newUser = new UserModel(true, user.login, user.pass, []);
    await setSession(req, newUser);
    await addUser(newUser);
    res.send({'ok': true});
};


/**
 * Takes data from response body and verify the user
 * @param req HTTP request with JSON data in body.
 * @param res HTTP response JSON (ok or error).
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    const b: { login: string, pass: string } = req.body;
    // Set session for user
    const user = await getUser(b.login, b.pass);
    if (user) {
        await setSession(req, user);
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
 * @param user from DataBase.
 */
export const setSession = async (req: Request, user?: IUser): Promise<void> => {
    req.session.registered = user?.registered || false;
    req.session.login = user?.login || 'anon';
    req.session.pass = user?.pass || 'anon';
    req.session.items = user?.items || [];
}
