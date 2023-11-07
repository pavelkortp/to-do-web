import {Request, Response} from "express";
import fetch from "node-fetch";

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const setSessionIfExist = async (req: Request, res: Response, next: Function) => {
    if (req.session.items == undefined) {
        req.session.items = [];
        req.session.register = false;
    }
    next(req, res);
}