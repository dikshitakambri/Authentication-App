const express = require('express');
const db = require('./config/mongoose');
const morgan = require('morgan');

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('./',require('./routes'));
app.listen(PORT, function(error){
    if(error) console.log('error:',error);
    console.log('server is running');
});