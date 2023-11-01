import {Request, Response} from "express";

const express = require('express');
const router = express.Router();
const data = require('./data');

router
    .route('/items')
    .get((req: Request, res: Response) => {
        res.send(data);
    })
    .post((req: Request, res: Response) => {
        const task: { id: number, text: string, checked: boolean } = req.body;

        task.checked = false;
        task.id = data.items
            .reduce((sum: number, cur: { id: number }) => {
                return sum + cur.id;
            }, 0);
        data.items.push(task);
        res.json({"id": task.id});
    })
    .put((req: Request, res: Response) => {

    })
    .delete((req: Request, res: Response) => {

    });

module.exports = router;