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
    await setSession(req, true);
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
    await setSession(req, true);
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
/**
 * Updates user data in session.
 * @param req HTTP request in JSON format
 * @param customData obj which contains fields which need to set.
 */
export const setSession = async (req, registered = false) => {
    req.session.registered = registered;
    req.session.login = req.body.login || 'anon';
    req.session.pass = req.body.pass || 'anon';
    req.session.items = req.session.items || [];
};
