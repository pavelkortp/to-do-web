import { getUser } from "./user-repository.js";
import { randomInt } from "crypto";
/**
 *
 * @param req
 * @param res
 */
export const getItems = async (req, res) => {
    const { registered, login, pass } = req.session;
    if (!login || !pass) {
        res.status(400).json({ 'error': 'not found' });
        return;
    }
    if (registered) {
        const user = await getUser(login, pass);
        res.json({ items: user === null || user === void 0 ? void 0 : user.items });
    }
    else {
        res.json({ items: req.session.items });
    }
};
/**
 *
 * @param req
 * @param res
 */
export const createItem = async (req, res) => {
    const { registered, login, pass, items } = req.session;
    const task = req.body;
    if (!login || !pass || !items) {
        res.status(400).json({ 'error': 'not found' });
        return;
    }
    if (registered) {
        const user = await getUser(login, pass);
        if (!user) {
            res.status(400).json({ 'error': 'not found' });
            return;
        }
        task.id = user.items
            .reduce((sum, cur) => {
            return sum + cur.id;
        }, 0) || randomInt(10);
        user.items.push(task);
        res.json({ 'id': task.id });
    }
    else {
        const id = items
            .reduce((sum, cur) => {
            return sum + cur.id;
        }, 0) || randomInt(10);
        items.push({ 'id': id, 'text': task.text, 'checked': task.checked });
        res.json({ 'id': id });
    }
};
/**
 * Edit item in list or push it if item not exist in list.
 * @param req
 * @param res
 */
export const editItem = async (req, res) => {
    const { registered, login, pass, items } = req.session;
    const body = req.body;
    if (!login || !pass || !items) {
        res.status(400).json({ "error": `not found` });
        return;
    }
    if (registered) {
        const user = await getUser(login, pass);
        if (!user) {
            res.status(400).json({ 'error': 'not found' });
            return;
        }
        const task = user
            .items
            .find((e) => e.id == body.id);
        if (!task) {
            res.status(500).json({ 'error': 'not found' });
            return;
        }
        task.checked = body.checked;
        task.text = body.text;
    }
    else {
        const anonTask = items
            .find((e) => e.id == body.id);
        if (!anonTask) {
            items.push(body);
            res.json({ 'ok': true });
            return;
        }
        anonTask.checked = body.checked;
        anonTask.text = body.text;
    }
    res.json({ 'ok': true });
};
/**
 * Removes task from task-list for registered and net registered users.
 * @param req HTTP request in JSON format which contains "id": item's id.
 * @param res HTTP response in JSON format "ok" or "error".
 */
export const deleteItem = async (req, res) => {
    let { registered, login, pass, items } = req.session;
    const body = req.body;
    if (!login || !pass || !items) {
        res.status(400).json({ 'error': 'not found' });
        return;
    }
    if (registered) {
        const user = await getUser(login, pass);
        if (!user) {
            res.status(400).json({ 'error': 'not found' });
            return;
        }
        user.items = user.items.filter((e) => e.id != body.id);
    }
    else {
        req.session.items = items.filter((e) => e.id != body.id);
    }
    res.json({ 'ok': true });
};
