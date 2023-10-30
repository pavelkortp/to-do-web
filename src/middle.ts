import { Request, Response } from "express";
const sup = (req: Request, res: Response, next: Function) => {
    console.log(req.method);
    console.log('sup');
    next();
};

const how = (req: Request, res: Response, next: Function) => {
    console.log('how yo doin');
    next();
};

module.exports = { sup, how };
