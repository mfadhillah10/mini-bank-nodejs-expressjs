'use strict';

module.exports = function(app) {
    var controller = require('../Controller/customer-controller');

    app.route('/customers').get(controller.customers);
    app.route('/customer/:id').get(controller.getCustomerById);
    app.route('/customer/:id').delete(controller.del);
    app.route('/customer').post(controller.insertCustomer);
    app.route('/customer').put(controller.updateCustomer);
};