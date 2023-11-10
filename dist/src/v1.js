import { itemsRouter } from "./items-router.js";
import { app } from "./application";
import { addUser, getUser } from "./user-repository.js";
import { UserModel } from "../models/UserModel.js";
app.use('/api/v1/items', itemsRouter);
app.post('/api/v1/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).json({ 'error': 'not found' });
        }
        else {
            res.json({ 'ok': true });
        }
    });
});
app.post('/api/v1/register', async (req, res) => {
    const user = req.body;
    if (user.login == undefined || user.pass == undefined) {
        res.status(400).json({ 'error': 'not found' });
    }
    req.session.registered = true;
    req.session.login = user.login;
    req.session.pass = user.pass;
    await addUser(new UserModel(true, user.login, user.pass, []));
    res.send({ 'ok': true });
});
app.post('/api/v1/login', async (req, res) => {
    const user = req.body;
    req.session.registered = true;
    req.session.login = user.login;
    req.session.pass = user.pass;
    if (await getUser(user.login, user.pass)) {
        res.send({ 'ok': true });
    }
    else {
        res.status(400).send({ 'error': 'not found' });
    }
});
