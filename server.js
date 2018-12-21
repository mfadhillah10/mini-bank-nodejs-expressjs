var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    controller = require('./Controller/customer-controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./Router/customer-routes');
var routesAcc = require('./Router/account-routes');
var routesTrx = require('./Router/transaction-routes');
routes(app);
routesAcc(app);
routesTrx(app);

app.listen(port);
console.log('Konnichiwa. Watashi wa NodeJS-desu. RESTful API saba no kaishi-bi: ' + port);