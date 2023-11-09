import { addUser, getUser } from "../src/user-repository.js";
import { UserModel } from "../models/UserModel.js";
/**
 * Takes data from response body and creates new user.
 * @param req HTTP request.
 * @param res HTTP response.
 */
export const register = async (req, res) => {
    const user = req.body;
    if (!user.login || !user.pass) {
        res.status(400).json({ 'error': 'not found' });
        return;
    }
    req.session.registered = true;
    req.session.login = user.login;
    req.session.pass = user.pass;
    await addUser(new UserModel(true, user.login, user.pass, []));
    res.send({ 'ok': true });
};
/**
 * Takes data from response body and verify the user
 * @param req HTTP request with JSON data in body.
 * @param res HTTP response JSON (ok or error).
 */
export const login = async (req, res) => {
    const user = req.body;
    // Set session for user
    req.session.registered = true;
    req.session.login = user.login;
    req.session.pass = user.pass;
    if (await getUser(user.login, user.pass)) {
        res.json({ 'ok': true });
    }
    else {
        res.status(400).json({ 'error': 'not found' });
    }
};
/**
 * Destroy user's session.
 * @param req HTTP request.
 * @param res HTTP response JSON (ok or error).
 */
export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).json({ 'error': 'not found' });
        }
        else {
            res.json({ 'ok': true });
        }
    });
};
