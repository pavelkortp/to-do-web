import { findTaskById, getUser, getUserFromSession, updateUserItems } from "../src/user-repository.js";
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
    const sessionUser = await getUserFromSession(req).catch(() => {
        res.status(400).json({ 'error': 'not found' });
    });
    if (sessionUser === null || sessionUser === void 0 ? void 0 : sessionUser.registered) {
        try {
            const user = await getUser(sessionUser.login, sessionUser.pass);
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
    const sessionUser = await getUserFromSession(req).catch(() => {
        res.status(400).json({ 'error': 'not found' });
    });
    const task = await createTask(req.body);
    if (sessionUser === null || sessionUser === void 0 ? void 0 : sessionUser.registered) {
        const user = await getUser(sessionUser.login, sessionUser.pass);
        if (!user) {
            res.json({ 'error': 'not found' });
            return;
        }
        user.items.push(task);
        await updateUserItems(user);
        req.session.items = user.items;
    }
    else {
        sessionUser === null || sessionUser === void 0 ? void 0 : sessionUser.items.push(task);
        req.session.items = sessionUser === null || sessionUser === void 0 ? void 0 : sessionUser.items;
    }
    res.json({ 'id': task.id });
};
/**
 * Edit item in list or push it if item not exist in list.
 * @param req HTTP request which contains JSON with "id", "text", "checked".
 * @param res HTTP response in JSON format: "ok" or "error".
 */
export const editItem = async (req, res) => {
    const sessionUser = await getUserFromSession(req);
    const body = req.body;
    const task = await findTaskById(body.id, sessionUser.items);
    if (!task) {
        sessionUser.items.push(new ItemModel(body.id, body.text, false));
        res.json({ 'ok': true });
        return;
    }
    task.checked = body.checked;
    task.text = body.text;
    if (sessionUser.registered) {
        await updateUserItems(sessionUser);
    }
    res.json({ 'ok': true });
};
/**
 * Removes task from task-list for registered and net registered users.
 * @param req HTTP request in JSON format which contains "id": item's id.
 * @param res HTTP response in JSON format "ok" or "error".
 */
export const deleteItem = async (req, res) => {
    const sessionUser = await getUserFromSession(req);
    const body = req.body;
    if (sessionUser.registered) {
        const user = await getUser(sessionUser.login, sessionUser.pass);
        if (!user) {
            res.status(400).json({ 'error': 'not found' });
            return;
        }
        user.items = user.items.filter((e) => e.id != body.id);
        await updateUserItems(user);
    }
    else {
        req.session.items = sessionUser.items.filter((e) => e.id != body.id);
    }
    res.json({ 'ok': true });
};
