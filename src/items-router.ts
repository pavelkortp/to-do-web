import {Request, Response} from "express";
import {data} from "./data.js";
import express from "express";
import {app} from "./index";

const itemsRouter = express.Router();
itemsRouter
    .route('')
    .get((req: Request, res: Response) => {
        console.log(req.session);
        const login = req.session.login;
        console.log(login);
        res.send(data.users.find((e)=>e.login==login)?.tasks);
    })
    .post((req: Request, res: Response) => {
        const login = req.session.login;
        console.log(login);
        const task: { id: number, text: string, checked: boolean } = req.body;

        task.id = data
            .users
            .find((e) => e.login == login)?.tasks
            .reduce((sum: number, cur: { id: number }) => {
                return sum + cur.id;
            }, 0) || 0;
        task.checked = false;

        data.users
            .find((e) => e.login == login)?.tasks.push(task);
        res.json({"id": task.id});
    })
    // .put((req: Request, res: Response) => {
    //     const login = req.session.login;
    //     const body: { id: number, text: string, checked: boolean } = req.body;
    //     const task = data.items.find((e: { id: number }) => e.id == body.id);
    //     if (task == undefined) {
    //         res.status(500).json({"error":"task not found"});
    //         return;
    //     }
    //     task.checked = body.checked;
    //     task.text = body.text;
    //     res.json({"ok": true});
    // })
    // .delete((req: Request, res: Response) => {
    //     const body: { id: number } = req.body;
    //     data.items = data.items.filter((e: { id: number }) => e.id != body.id);
    //     res.json({"ok": true});
    // });
export {itemsRouter};