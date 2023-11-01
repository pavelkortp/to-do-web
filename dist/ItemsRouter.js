const express = require('express');
const router = express.Router();
const data = require('./data');
router
    .route('/items')
    .get((req, res) => {
    res.send(data);
})
    .post((req, res) => {
    const task = req.body;
    task.checked = 'false';
    task.id = data.items
        .reduce((sum, cur) => {
        return sum + cur.id;
    }, 0);
    data.items.push(task);
    res.json({ "id": task.id });
})
    .put((req, res) => {
})
    .delete((req, res) => {
});
module.exports = router;

