var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    controller = require('./Controller/customer-controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var logger = require('./winston-logger');

app.use(morgan('combined',{ "stream": logger.stream }));
logger.debug("Overriding 'Express' logger");

var routes = require('./Router/customer-routes');
var routesAcc = require('./Router/account-routes');
var routesTrx = require('./Router/transaction-routes');
routes(app);
routesAcc(app);
routesTrx(app);

app.listen(port);
logger.debug('Konnichiwa. Watashi wa NodeJS-desu. RESTful API saba no kaishi-bi: ' + port);