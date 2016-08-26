var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');
var jwt = require('jsonwebtoken');

var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Headers', 'Authorization');

    req.header('Access-Control-Allow-Origin', '*');
    req.header('Content-Type', 'application/json');

    // res.send(req.headers);

    // var token = req.headers['authorization';
    //
    // if (!token){
    //   res.send({status: false, message: 'No token provided'})
    // }
    // else {
    //   jwt.verify(token, 'test', function(err, decoded) {
    //     if (err){
    //       res.send({status: false, message: 'Token authorization failed'});
    //     }
    //     else {
    //       next();
    //     }
    //   });
    // }

    next();

}

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(allowCrossDomain);

connection.init();
routes.configure(app);

var server = app.listen(8100, function() {
  console.log('Server listening on port ' + server.address().port);
});
