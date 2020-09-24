const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/route');
const app = express();
app.use(cors());
const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@peerprep.bzetx.mongodb.net/assignment?retryWrites=true&w=majority`;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to db'));
db.once('open', console.error.bind(console, 'Db connected successfully'));

app.use('/api', routes);

module.exports = app