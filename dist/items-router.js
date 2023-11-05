import { data } from "./data.js";
import express from "express";
import { app } from "./index.js";
const itemsRouter = express.Router();
app.post('/api/v1/items', (req, res) => {
    var _a, _b;
    const login = req.session.login;
    console.log(login);
    const task = req.body;
    task.id = ((_a = data
        .users
        .find((e) => e.login == login)) === null || _a === void 0 ? void 0 : _a.tasks.reduce((sum, cur) => {
        return sum + cur.id;
    }, 0)) || 0;
    task.checked = false;
    (_b = data.users
        .find((e) => e.login == login)) === null || _b === void 0 ? void 0 : _b.tasks.push(task);
    res.json({ "id": task.id });
});
// .put((req: Request, res: Response) => {
//     const login = req.session.login;
//     const body: { id: number, text: string, checked: boolean } = req.body;
//     const task = data.items.find((e: { id: number }) => e.id == body.id);
//     if (task == undefined) {
//         res.status(500).json({"error":"task not found"});
//         return;
//     }
//     task.checked = body.checked;
//     task.text = body.text;
//     res.json({"ok": true});
// })
// .delete((req: Request, res: Response) => {
//     const body: { id: number } = req.body;
//     data.items = data.items.filter((e: { id: number }) => e.id != body.id);
//     res.json({"ok": true});
// });
export { itemsRouter };
