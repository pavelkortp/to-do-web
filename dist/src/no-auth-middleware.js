import { setSession } from "../handlers/auth-handler.js";
import { UserModel } from "../models/UserModel.js";
/**
 * Set session for each HTTP request if it not exists
 * @param req HTTP request.
 * @param res HTTP response.
 * @param next next Function
 */
export const setSessionIfNotExist = async (req, res, next) => {
    if (!req.session) {
        await setSession(req, new UserModel(false, 'anon', 'anon', []));
    }
    next();
};
