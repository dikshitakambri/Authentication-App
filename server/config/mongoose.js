const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cn-node-auth');
const db = mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting DB'));

db.once('open',function(){
    console.log('Successfully connected to databasse :: MongoDB');
})

module.exports = db;