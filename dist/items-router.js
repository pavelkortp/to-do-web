import { data } from "./data.js";
import express from "express";
import { randomInt } from "crypto";
const itemsRouter = express.Router();
itemsRouter
    .route('')
    .get((req, res) => {
    const login = req.session.login;
    const pass = req.session.pass;
    console.log({ login, pass });
    if (login == undefined || pass == undefined) {
        req.session.items = [];
        res.send({ items: [] });
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
    // if (login == undefined || pass == undefined) {
    //     if(req.session.items!=undefined){
    //         req.session.items.push({id:randomInt(100), text:task.text, checked: false});
    //     }
    //     res.send({items: []});
    //     return;
    // }
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
    var _a;
    const login = req.session.login;
    const body = req.body;
    const task = (_a = data
        .users
        .find((e) => e.login == login)) === null || _a === void 0 ? void 0 : _a.tasks.find((e) => e.id == body.id);
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
    const body = req.body;
    const user = data
        .users
        .find((e) => e.login == login);
    if (user == undefined) {
        res.status(500).json({ "error": "User not found" });
        return;
    }
    user.tasks = user.tasks.filter((e) => e.id != body.id);
    res.json({ "ok": true });
});
export { itemsRouter };
