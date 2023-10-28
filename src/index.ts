import { Response, Request, Express} from 'express';

const express = require('express');
const app: Express = express();
const port: number = 3000;

app.use(express.static('front'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile('front/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});