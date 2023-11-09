import express, {Request, Response, Express} from 'express';

const port: number = 8080;
const app: Express = express();

app.use(express.static('front'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html');
});

app.listen(port, ()=>{
    console.log(`Front hosts at port ${port}`);
});