const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'production'){
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost/unipe-csv');
    mongoose.set('debug', true);
}

require('./models/User');

app.use(require('./routes'));


const server = app.listen( process.env.PORT || 3001, function(){
    console.log('Listening on port ' + server.address().port);
});