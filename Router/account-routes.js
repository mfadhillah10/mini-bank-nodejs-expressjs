'use strict';

module.exports = function(app) {
    var controller = require('../Controller/account-controller');

    app.route('/accounts').get(controller.accounts);
    app.route('/account/:id').get(controller.getAccountById);
    app.route('/account/:id').delete(controller.del);
    app.route('/account').post(controller.insertAccount);
    app.route('/account').put(controller.updateAccount);
}