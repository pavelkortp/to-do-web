import express from "express";
const authRouter = express.Router();
export { authRouter };
authRouter
    .post('/register', (req, res) => {
    const user = req.body;
    req.session.login = user.login;
    req.session.pass = user.pass;
    res.json({ "ok": "true" });
})
    .post('/logout ', (req, res) => {
    req.session.destroy((err) => {
        res.json({ "error": "Logged out was unsuccessful" });
        return;
    });
    res.json({ "ok": "true" });
})
    .post('/login', (req, res) => {
});
