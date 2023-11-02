import {Request, Response, Express} from "express";
import express from "express";
import {router} from "./ItemsRouter.js";
import bodyParser from "body-parser";
// import cors from "cors";

const port: number = 3005;
const app: Express = express();
// app.use(cors);
app.use(bodyParser.json());
app.use(express.static('front'));
app.use('/api/v1', router);

app.get('/', (req:Request, res:Response)=>{
    res.sendFile('index.html');
});



app.listen(port, ()=>{
    console.log(`server listen port: ${port}`);
})
