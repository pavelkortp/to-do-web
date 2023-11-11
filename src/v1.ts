import {Request, Response} from 'express';
import {itemsRouter} from './items-router.js';
import {app} from './application.js';
import {addUser, getUser} from './user-repository.js';
import {UserModel} from '../models/UserModel.js';
import {setSession} from '../handlers/auth-handler.js';


app.use('/api/v1/items', itemsRouter);

app.post('/api/v1/logout', (req: Request, res: Response) => {
    req.session.destroy((err: Error) => {
        if (err) {
            res.status(400).json({'error': 'not found'});
        } else {
            res.json({'ok': true});
        }
    });
});

app.post('/api/v1/register', async (req: Request, res: Response) => {
    const b: { login: string, pass: string } = req.body;
    if (await getUser(b.login, b.pass)) {
        res.status(400).json({'error': 'user with current login already exist'});
        return;
    }
    const user = new UserModel(true, b.login, b.pass, [])
    await setSession(req);
    await addUser(user);
    res.send({'ok': true});

});

app.post('/api/v1/login', async (req: Request, res: Response) => {
    const b: { login: string, pass: string } = req.body;
    const user = await getUser(b.login, b.pass);
    if (user) {
        await setSession(req, user);
        res.send({'ok': true});
    } else {
        await setSession(req);
        res.status(400).send({'error': 'not found'});
    }
});


