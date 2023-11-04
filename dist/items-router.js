import { data } from "./data.js";
import express from "express";
const itemsRouter = express.Router();
itemsRouter
    .route('')
    .get((req, res) => {
    res.send(data);
})
    .post((req, res) => {
    const task = req.body;
    task.id = data.items
        .reduce((sum, cur) => {
        return sum + cur.id;
    }, 0);
    task.checked = false;
    data.items.push(task);
    res.json({ "id": task.id });
})
    .put((req, res) => {
    const body = req.body;
    const task = data.items.find((e) => e.id == body.id);
    if (task == undefined) {
        res.status(500).json({ "error": "task not found" });
        return;
    }
    task.checked = body.checked;
    task.text = body.text;
    res.json({ "ok": true });
})
    .delete((req, res) => {
    const body = req.body;
    data.items = data.items.filter((e) => e.id != body.id);
    res.json({ "ok": true });
});
export { itemsRouter };
