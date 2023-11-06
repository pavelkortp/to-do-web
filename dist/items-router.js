import { data } from "./data.js";
import express from "express";
import { randomInt } from "crypto";
const itemsRouter = express.Router();
itemsRouter
    .route('')
    .get((req, res) => {
    const login = req.session.login;
    const pass = req.session.pass;
    if (login == undefined || pass == undefined) {
        if (req.session.items == undefined) {
            req.session.items = [];
        }
        res.send({ items: req.session.items });
        return;
    }
    const user = data
        .users
        .find((e) => e.login == login && e.pass == pass);
    if (user == undefined) {
        res.status(400).json({ "error": `User with login: ${login} and pass: ${pass} not found` });
        return;
    }
    res.send({ items: user.tasks });
})
    .post((req, res) => {
    const login = req.session.login;
    const pass = req.session.pass;
    const task = req.body;
    if (login == undefined || pass == undefined) {
        if (req.session.items == undefined) {
            req.session.items = [];
        }
        const anonTask = { "id": randomInt(100), "text": task.text, "checked": false };
        req.session.items.push(anonTask);
        res.json({ "id": anonTask.id });
        return;
    }
    const user = data
        .users
        .find((e) => e.login == login && e.pass == pass);
    if (user == undefined) {
        res.status(400).send({ "error": "User not found, check your data" });
        return;
    }
    task.id = user.tasks
        .reduce((sum, cur) => {
        return sum + cur.id;
    }, 0) || randomInt(10);
    task.checked = false;
    user.tasks.push(task);
    res.json({ "id": task.id });
})
    .put((req, res) => {
    const login = req.session.login;
    const pass = req.session.pass;
    const body = req.body;
    if (login == undefined || pass == undefined) {
        if (req.session.items == undefined) {
            req.session.items = [];
            res.json({ "ok": "false" });
            return;
        }
        const anonTask = req.session.items
            .find((e) => e.id == body.id);
        res.json({ "ok": "true" });
        return;
    }
    const user = data
        .users
        .find((e) => e.login == login && e.pass == pass);
    if (user == undefined) {
        res.status(400).send({ "error": "User not found, check your data" });
        return;
    }
    const task = user
        .tasks
        .find((e) => e.id == body.id);
    if (task == undefined) {
        res.status(500).json({ "error": "task not found" });
        return;
    }
    task.checked = body.checked;
    task.text = body.text;
    res.json({ "ok": true });
})
    .delete((req, res) => {
    const login = req.session.login;
    const pass = req.session.pass;
    const body = req.body;
    if (login == undefined || pass == undefined) {
        if (req.session.items == undefined) {
            req.session.items = [];
        }
        req.session.items = req.session.items.filter((e) => e.id != body.id);
        res.json({ "id": body.id });
        return;
    }
    const user = data
        .users
        .find((e) => e.login == login && e.pass == pass);
    if (user == undefined) {
        res.status(500).json({ "error": "User not found" });
        return;
    }
    user.tasks = user.tasks.filter((e) => e.id != body.id);
    res.json({ "ok": true });
});
export { itemsRouter };
