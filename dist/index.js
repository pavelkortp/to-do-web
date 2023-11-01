const express = require('express');
const itemsRouter = require('./ItemsRouter');
const bodyParser = require('body-parser');
const port = 3005;
const app = express();
const cors = require('cors');
// app.use(cors);
app.use(bodyParser.json());
app.use(express.static('front'));
app.use('/api/v1', itemsRouter);
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.listen(port, () => {
    console.log(`server listen port: ${port}`);
});

