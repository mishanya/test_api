const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const config = require('config')

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/logs/error.log', {flags : 'w'});
var log_stdout = process.stdout;

app.disable('x-powered-by');
app.set('trust proxy', true)

app.listen(process.env.PORT || 3022);
console.log(`App listening on port ${process.env.PORT }`);

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
  log_file.write(util.format(err) + '\n');
  log_stdout.write(util.format(err) + '\n');
});


app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path)
    res.setHeader('Access-Control-Allow-Origin', config.get('origin') );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, token, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/v1', require('./v1/routes'));
