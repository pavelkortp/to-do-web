import { getUser, updateUserItems } from "../src/user-repository.js";
import { ItemModel } from "../models/ItemModel.js";
/**
 * Creates new item from request body.
 * @param body HTTP request body in JSON format.
 */
const createTask = async (body) => {
    const randomId = await ItemModel.getRandomId();
    return new ItemModel(randomId, body.text, false);
};
/**
 * Returns all user tasks.
 * @param req HTTP request
 * @param res
 */
export const getItems = async (req, res) => {
    const { registered, login, pass } = req.session;
    if (!login || !pass) {
        res.status(400).json({ 'error': 'not found' });
        return;
    }
    if (registered) {
        try {
            const user = await getUser(login, pass);
            res.json({ items: user === null || user === void 0 ? void 0 : user.items });
        }
        catch (err) {
            res.status(500).json({ error: 'file not found' });
        }
    }
    else {
        res.json({ items: req.session.items });
    }
};
/**
 * Creates new task and save it for current user.
 * @param req HTTP request which contains JSON with "text".
 * @param res HTTP response in JSON format which contains "id".
 */
export const createItem = async (req, res) => {
    const { registered, login, pass, items } = req.session;
    const task = await createTask(req.body);
    if (!login || !pass || !items) {
        res.status(400).json({ 'error': 'not found' });
        return;
    }
    console.log(task);
    if (registered) {
        const user = await getUser(login, pass);
        if (!user) {
            res.json({ 'error': 'not found' });
            return;
        }
        user.items.push(task);
        await updateUserItems(user);
        req.session.items = user.items;
    }
    else {
        items.push(task);
        req.session.items = items;
    }
    res.json({ 'id': task.id });
};
/**
 * Edit item in list or push it if item not exist in list.
 * @param req HTTP request which contains JSON with "id", "text", "checked".
 * @param res HTTP response in JSON format: "ok" or "error".
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
            res.json({ 'error': 'not found' });
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
        await updateUserItems(user);
    }
    else {
        const anonTask = items
            .find((e) => e.id == body.id);
        if (!anonTask) {
            items.push(new ItemModel(body.id, body.text, false));
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
        console.log(body);
        user.items = user.items.filter((e) => e.id != body.id);
        console.log(user.items);
        await updateUserItems(user);
    }
    else {
        req.session.items = items.filter((e) => e.id != body.id);
    }
    res.json({ 'ok': true });
};
