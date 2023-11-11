import {Request, Response} from 'express';
import {getUser} from '../src/user-repository';
import {randomInt} from 'crypto';

/**
 * Send all user tasks.
 * @param req HTTP request.
 * @param res HTTP response which contains JSON with "items":[]
 */
export const getItems = async (req: Request, res: Response): Promise<void> => {
    const {registered, login, pass} = req.session;
    if (!login || !pass) {
        res.status(400).json({'error': 'not found'});
        return;
    }
    if (registered) {
        const user = await getUser(login, pass);
        res.json({items: user?.items});
    } else {
        res.json({items: req.session.items})
    }

};

/**
 * Creates new item and save it to session and to storage.
 * @param req HTTP request which contains JSON with "text".
 * @param res HTTP response with JSON with "id" - if task successfully adds <br>
 * otherwise - "error".
 */
export const createItem = async (req: Request, res: Response): Promise<void> => {
    const {registered, login, pass, items} = req.session;
    const task: { id: number, text: string, checked: false } = req.body;

    if (!login || !pass || !items) {
        res.status(400).json({'error': 'not found'});
        return;
    }
    if (registered) {
        const user = await getUser(login, pass);
        if (!user) {
            res.status(400).json({'error': 'not found'});
            return;
        }

        task.id = user.items
            .reduce((sum: number, cur: { id: number }) => {
                return sum + cur.id;
            }, 0) || randomInt(10);

        user.items.push(task);
        res.json({'id': task.id});
    } else {
        const id = items
            .reduce((sum: number, cur: { id: number }) => {
                return sum + cur.id;
            }, 0) || randomInt(10);
        items.push({'id': id, 'text': task.text, 'checked': task.checked});
        res.json({'id': id});
    }
}

/**
 * Edit item in list or push it if item not exist in list.
 * @param req HTTP request, which contains JSON item {id, text, checked}
 * @param res HTTP response in JSOn format with "ok" if task successfully changed <br>
 * otherwise - "error".
 */
export const editItem = async (req: Request, res: Response): Promise<void> => {
    const {registered, login, pass, items} = req.session;
    const body: { id: number, text: string, checked: boolean } = req.body;

    if (!login || !pass || !items) {
        res.status(400).json({"error": `not found`});
        return;
    }
    if (registered) {
        const user = await getUser(login, pass);
        if (!user) {
            res.status(400).json({'error': 'not found'});
            return;
        }

        const task = user
            .items
            .find((e: { id: number }) => e.id == body.id);

        if (!task) {
            res.status(500).json({'error': 'not found'});
            return;
        }
        task.checked = body.checked;
        task.text = body.text;
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
        const user = await getUser(login, pass);
        if (!user) {
            res.status(400).json({'error': 'not found'});
            return;
        }
        user.items = user.items.filter((e: { id: number }) => e.id != body.id);
    } else {
        req.session.items = items.filter((e: { id: number }) => e.id != body.id);
    }
    res.json({'ok': true});
}