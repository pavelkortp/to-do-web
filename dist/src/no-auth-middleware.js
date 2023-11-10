import { setSession } from "../handlers/auth-handler.js";
/**
 * Set session for each HTTP request if it not exists
 * @param req HTTP request.
 * @param res HTTP response.
 * @param next next Function
 */
export const setSessionIfNotExist = async (req, res, next) => {
    if (!req.session.login) {
        await setSession(req);
    }
    next();
};
