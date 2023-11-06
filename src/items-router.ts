import {Request, Response} from "express";
import {data} from "./data.js";
import express from "express";
import {randomInt} from "crypto";

const itemsRouter = express.Router();
itemsRouter
    .route('')
    .get((req: Request, res: Response) => {
        const login = req.session.login;
        const pass = req.session.pass;
        if (login == undefined || pass == undefined) {
            req.session.items = [];
            res.send({items: []});
            return;
        }
        const user = data
            .users
            .find((e) => e.login == login && e.pass == pass);

        if (user == undefined) {
            res.status(400).json({"error": `User with login: ${login} and pass: ${pass} not found`});
            return;
        }
        res.send({items: user.tasks});
    })
    .post((req: Request, res: Response) => {
        const login = req.session.login;
        const pass = req.session.pass;
        const task: { id: number, text: string, checked: boolean } = req.body;

        if (login == undefined || pass == undefined) {
            if(req.session.items!=undefined){
                req.session.items.push({"id":1, "text":'task.text', "checked": false});
            }
            res.send({items: []});
            return;
        }
        const user = data
            .users
            .find((e) => e.login == login && e.pass == pass);
        if(user == undefined){
            res.status(400).send({"error": "User not found, check your data"});
            return;
        }

        task.id = user.tasks
            .reduce((sum: number, cur: { id: number }) => {
                return sum + cur.id;
            }, 0) || randomInt(10);
        task.checked = false;

        user.tasks.push(task);


        res.json({"id": task.id});
    })
    .put((req: Request, res: Response) => {
        const login = req.session.login;

        const body: { id: number, text: string, checked: boolean } = req.body;
        const task = data
            .users
            .find((e: { login: string }) => e.login == login)
            ?.tasks
            .find((e: { id: number }) => e.id == body.id);

        if (task == undefined) {
            res.status(500).json({"error": "task not found"});
            return;
        }
        task.checked = body.checked;
        task.text = body.text;
        res.json({"ok": true});
    })
    .delete((req: Request, res: Response) => {
        const login = req.session.login;
        const body: { id: number } = req.body;

        const user = data
            .users
            .find((e: { login: string }) => e.login == login);
        if (user == undefined) {
            res.status(500).json({"error": "User not found"});
            return;
        }
        user.tasks = user.tasks.filter((e: { id: number }) => e.id != body.id);
        res.json({"ok": true});
    });
export {itemsRouter};