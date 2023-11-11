import {Request, Response} from 'express';

/**
 * Set session for each HTTP request if it not exists
 * @param req HTTP request.
 * @param res HTTP response.
 * @param next next Function
 */
export const setSessionIfNotExist =  async (req: Request, res: Response, next: Function) => {
    if (!req.session.login) {
        req.session.login = 'anonymous';
        req.session.pass = 'anonymous';
        req.session.items = [];
        req.session.registered = false;
    }
    next();

}