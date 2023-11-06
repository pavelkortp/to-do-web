import {Request, Response} from "express";
import express from "express";
import {randomInt} from "crypto";
import {getUser} from "./user-repository.js";

const itemsRouter = express.Router();
itemsRouter
    .route('')
    .get((req: Request, res: Response) => {
        const {login, pass} = req.session;

        if (login == undefined || pass == undefined) {
            if (req.session.items == undefined) {
                req.session.items = []
            }
            res.send({items: req.session.items});

        } else {

            const user = getUser(login, pass);
            if (user == undefined) {
                res.status(400).json({"error": `not found`});
                return;
            }
            res.send({items: user.tasks});
        }

    })
    .post((req: Request, res: Response) => {
        const {login, pass} = req.session;
        const task: { id: number, text: string, checked: false } = req.body;

        if (login == undefined || pass == undefined) {
            if (req.session.items == undefined) {
                req.session.items = []
            }
            const id = req.session.items
                .reduce((sum: number, cur: { id: number }) => {
                    return sum + cur.id;
                }, 0) || randomInt(10);
            req.session.items.push({"id": id, "text": task.text, "checked": task.checked});
            res.json({"id": id});

        } else {
            const user = getUser(login, pass);
            if (user == undefined) {
                res.status(400).json({"error": `not found`});
                return;
            }

            task.id = user.tasks
                .reduce((sum: number, cur: { id: number }) => {
                    return sum + cur.id;
                }, 0) || randomInt(10);

            user.tasks.push(task);

            res.json({"id": task.id});
        }

    })
    .put((req: Request, res: Response) => {
        const {login, pass} = req.session;
        const body: { id: number, text: string, checked: boolean } = req.body;

        if (login == undefined || pass == undefined) {
            if (req.session.items == undefined) {
                req.session.items = [body]
                res.json({"ok": "true"});
                ``
                return;
            }
            const anonTask = req.session.items
                .find((e: { id: number, }) => e.id == body.id);
            if (anonTask == undefined) {
                req.session.items.push(body);
                res.json({"ok": "true"});
                return;
            }
            anonTask.checked = body.checked;
            anonTask.text = body.text;
            res.json({"ok": "true"});

        } else {
            const user = getUser(login, pass);
            if (user == undefined) {
                res.status(400).json({"error": `not found`});
                return;
            }

            const task = user
                .tasks
                .find((e: { id: number }) => e.id == body.id);

            if (task == undefined) {
                res.status(500).json({"error": "not found"});
                return;
            }
            task.checked = body.checked;
            task.text = body.text;
            res.json({"ok": true});
        }


    })
    .delete((req: Request, res: Response) => {
        const {login, pass} = req.session;
        const body: { id: number } = req.body;

        if (login == undefined || pass == undefined) {
            if (req.session.items == undefined) {
                req.session.items = []
                return;
            }
            req.session.items = req.session.items.filter((e: { id: number }) => e.id != body.id);

        } else {
            const user = getUser(login, pass);
            if (user == undefined) {
                res.status(400).json({"error": `not found`});
                return;
            }
            user.tasks = user.tasks.filter((e: { id: number }) => e.id != body.id);
        }
        res.json({"id": body.id});
    });
export {itemsRouter};