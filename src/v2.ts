import {Request, Response} from "express";
import {app} from "./index.js";
import {login, logout, register} from "../hendlers/auth-hendler.js";
import {createItem, deleteItem, editItem, getItems} from "../hendlers/items-hendler.js";


app.post('/api/v2/router', async (req: Request, res: Response) => {
    switch (req.query.action) {
        case 'login':
            await login(req, res);
            break;
        case 'register':
            await register(req, res);
            break;
        case 'logout':
            await logout(req, res);
            break;
        case 'getItems':
            await getItems(req, res);
            break;
        case 'deleteItem':
            await deleteItem(req, res);
            break;
        case 'createItem':
            await createItem(req, res);
            break;
        case 'editItem':
            await editItem(req, res);
            break;
        default:
            res.status(400).json({'error': 'not found'});
    }
});

