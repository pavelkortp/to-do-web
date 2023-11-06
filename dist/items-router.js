import { data } from "./data.js";
import express from "express";
import { randomInt } from "crypto";
const itemsRouter = express.Router();
itemsRouter
    .route('')
    .get((req, res) => {
    var _a;
    const login = req.session.login;
    res.send((_a = data
        .users
        .find((e) => e.login == login)) === null || _a === void 0 ? void 0 : _a.tasks);
})
    .post((req, res) => {
    var _a, _b;
    const login = req.session.login;
    const task = req.body;
    task.id = ((_a = data
        .users
        .find((e) => e.login == login)) === null || _a === void 0 ? void 0 : _a.tasks.reduce((sum, cur) => {
        return sum + cur.id;
    }, 0)) || randomInt(10);
    task.checked = false;
    (_b = data
        .users
        .find((e) => e.login == login)) === null || _b === void 0 ? void 0 : _b.tasks.push(task);
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
