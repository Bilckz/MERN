const express = require('express');
const bodypParser = require('body-parser');

const app = express();

app.use(bodypParser.json()); 
app.use(bodypParser.urlencoded({ extended: false})); //entender os parametros da url

app.get('/', (req, res) => {
    res.send('funfou')
})

require('./controllers/authController')(app);

app.listen(3000);
