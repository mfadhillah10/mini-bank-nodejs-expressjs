const { Account, Customer } = require('../Database/sequelize');
var logger = require('../winston-logger');

exports.getById = function getById(id, callback) {
    Account.findById(id).then((account) => {
        return callback(null, account);
    }).catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.getAll = function getAll(whereClause, callback) {
    Account.findAll({
        where: whereClause,
        include:[Customer]
    }).then((accounts) => {
        return callback(null, accounts);
    }).catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.insert = function insert(data, callback) {
    let account = data;
    if (account.customer == null && account.cust_number == null) {
        res.json('Customer data is empty');
    } else {
        if (account.cust_number == null) {
            account.cust_number = account.customer.custnumber;
        }
    }
    Account.create(account).then(account => {
        return callback(null, account);
    }).catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.update = function update(id, data, callback) {
    let account = data;
    if (account.customer == null && account.cust_number == null) {
        res.json('Customer data is empty');
    } else {
        if (account.cust_number == null) {
            account.cust_number = account.customer.custnumber;
        }
    }
    Account.update(data, {
        where: {accountNumber: data.accountNumber},
        returning: true,
        plain: true
    }).then(result => {
        logger.info('result updated');
        logger.info(result);
        return callback(null, data);
    }).catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.del = function del(id, callback) {
    Account.destroy({
        where: {accountNumber: id}
    }).then(result => {
        logger.info('result update');
        logger.info(result);
        return callback(null, id);
    }).catch((error) => {
        logger.error(error);
        return callback(error);
    })
};