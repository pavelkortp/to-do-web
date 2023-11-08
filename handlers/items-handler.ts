import {Request, Response} from "express";
import {editItemFromFile, getUserFromFile} from "../src/user-repository.js";
import {ItemModel} from "../models/ItemModel.js";


/**
 * Returns all user tasks.
 * @param req HTTP request
 * @param res HTTP response in JSON format with all tasks.
 */
export const getItems = async (req: Request, res: Response): Promise<void> => {
    const {registered, login, pass} = req.session;
    if (!login || !pass) {
        res.status(400).json({'error': 'not found'});
        return;
    }
    if (registered) {
        try {
            const user = await getUserFromFile(login, pass);
            res.json({items: user?.items});
        } catch (err) {
            res.status(500).json({error: 'file not found'});
        }
    } else {
        res.json({items: req.session.items})
    }

};

/**
 * Creates new task and save it for current user.
 * @param req HTTP request which contains JSON with "text".
 * @param res HTTP response in JSON format which contains "id".
 */
export const createItem = async (req: Request, res: Response): Promise<void> => {
    const {registered, login, pass, items} = req.session;
    const task: ItemModel = req.body;

    if (!login || !pass || !items) {
        res.status(400).json({'error': 'not found'});
        return;
    }
    const randomId = await ItemModel.getRandomId();
    if (registered) {
        const user = await getUserFromFile(login, pass);
        task.id = randomId;
        task.checked = false;
        user.items.push(task);
        await editItemFromFile(user);
        res.json({'id': task.id});
    } else {
        const id = randomId;
        items.push({'id': id, 'text': task.text, 'checked': task.checked});
        res.json({'id': id});
    }
}

/**
 * Edit item in list or push it if item not exist in list.
 * @param req HTTP request which contains JSON with "id", "text", "checked".
 * @param res HTTP response in JSON format: "ok" or "error".
 */
export const editItem = async (req: Request, res: Response): Promise<void> => {
    const {registered, login, pass, items} = req.session;
    const body: { id: number, text: string, checked: boolean } = req.body;

    if (!login || !pass || !items) {
        res.status(400).json({"error": `not found`});
        return;
    }
    if (registered) {
        const user = await getUserFromFile(login, pass);

        const task = user
            .items
            .find((e: { id: number }) => e.id == body.id);

        if (!task) {
            res.status(500).json({'error': 'not found'});
            return;
        }
        task.checked = body.checked;
        task.text = body.text;
        await editItemFromFile(user);
    } else {
        const anonTask = items
            .find((e: { id: number }) => e.id == body.id);
        if (!anonTask) {
            items.push(body);
            res.json({'ok': true});
            return;
        }
        anonTask.checked = body.checked;
        anonTask.text = body.text;
    }
    res.json({'ok': true});
}

/**
 * Removes task from task-list for registered and net registered users.
 * @param req HTTP request in JSON format which contains "id": item's id.
 * @param res HTTP response in JSON format "ok" or "error".
 */
export const deleteItem = async (req: Request, res: Response): Promise<void> => {
    let {registered, login, pass, items} = req.session;
    const body: { id: number } = req.body;

    if (!login || !pass || !items) {
        res.status(400).json({'error': 'not found'});
        return;
    }

    if (registered) {
        const user = await getUserFromFile(login, pass);
        if (!user) {
            res.status(400).json({'error': 'not found'});
            return;
        }
        user.items = user.items.filter((e: { id: number }) => e.id != body.id);
        await editItemFromFile(user);
    } else {
        req.session.items = items.filter((e: { id: number }) => e.id != body.id);
    }
    res.json({'ok': true});
}