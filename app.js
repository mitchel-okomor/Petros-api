const http = require('http');


const express = require('express');
const logger = require('morgan');
var cors = require('cors')
const bodyParser = require('body-parser');
const api = require('./routes/api'); 

// Set up the express app
const app = express();

//set view engine
app.set('view engine', 'ejs');

// Log requests to the console.
app.use(logger('dev'));

app.use(cors());
  //set CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.urlencoded({
  extended: true
}));
  app.use(bodyParser.json());
  //serve static files
app.use(express.static('public'))
// Bundle API routes.
app.use('/', api);

const server = http.createServer(app);
server.listen(4000);
server.on('listening', () => {console.log("server connected")});
