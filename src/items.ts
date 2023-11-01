import {Request, Response} from "express";
const express = require('express');
let router = express.Router();

router
    .route('/cars')
    .get((req:Request, res:Response)=>{
        res.send('<img src="https://st4.depositphotos.com/7677414/22277/i/600/depositphotos_222777120-stock-photo-front-angle-view-generic-red.jpg" alt="car">');
    })
    .post((req:Request, res:Response)=>{
        res.send('<h1>Hello from POST /cars</h1>');
    })


module.exports(router);