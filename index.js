const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/route');
const app = express();
const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@peerprep.bzetx.mongodb.net/assignment?retryWrites=true&w=majority`;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to db'));
db.once('open', console.error.bind(console, 'Db connected successfully'));

app.use('/api', routes);
app.get('/', (req, res) => res.send('Hello World!'));

module.exports = app