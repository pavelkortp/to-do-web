import {Request, Response} from "express";
import express from "express";
import {data} from "./data.js";

const router = express.Router();
router
    .route('/items')
    .get((req: Request, res: Response) => {
        res.send(data);
    })
    .post((req: Request, res: Response) => {
        const task: { id: number, text: string, checked: string } = req.body;

        task.checked = 'false';
        task.id = data.items
            .reduce((sum: number, cur: { id: number }) => {
                return sum + cur.id;
            }, 0);
        data.items.push(task);
        res.json({"id": task.id});
    })
    .put((req: Request, res: Response) => {

    })
    .delete((req: Request, res: Response) => {

    });
export{router};