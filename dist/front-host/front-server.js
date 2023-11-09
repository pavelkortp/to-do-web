import express from 'express';
const port = 8080;
const app = express();
app.use(express.static('front'));
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.listen(port, () => {
    console.log(`Front hosts at port ${port}`);
});
