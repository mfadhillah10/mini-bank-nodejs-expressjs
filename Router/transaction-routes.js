'use strict';

module.exports = function(app) {
    var controller = require('../Controller/transaction-controller');

    app.route('/transactions').get(controller.transactions);
    app.route('/transaction/:id').get(controller.getTransactionById);
    app.route('/transaction/:id').delete(controller.del);
    app.route('/transaction').post(controller.insertTransaction);
    app.route('/transaction').put(controller.updateTransaction);
}