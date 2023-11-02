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

        task.id = data.items
            .reduce((sum: number, cur: { id: number }) => {
                return sum + cur.id;
            }, 0);
        task.checked = 'false';

        data.items.push(task);
        res.json({"id": task.id});
    })
    .put((req: Request, res: Response) => {
        const body: { id: number, text: string, checked: string } = req.body;
        const task = data.items.find((e: { id: number }) => e.id == body.id);
        if (task == undefined) {
            res.status(500).send('task not found');
            return;
        }
        task.checked = body.checked;
        task.text = body.text;
        res.json({"ok": "true"});
    })
    .delete((req: Request, res: Response) => {
        const body: { id: number } = req.body;
        data.items = data.items.filter((e: { id: number }) => e.id != body.id);
        res.json({"ok": "true"});
    });
export {router};