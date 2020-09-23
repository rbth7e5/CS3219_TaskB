let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let routes = require('./routes/route');
const app = express();
const port = process.env.PORT || 8080;
const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@peerprep.bzetx.mongodb.net/assignment?retryWrites=true&w=majority`;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to db'));
db.once('open', console.error.bind(console, 'Db connected successfully'));

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', routes);

app.listen(port, function () {
    console.log("Running Task B on port " + port);
});

module.exports = app;