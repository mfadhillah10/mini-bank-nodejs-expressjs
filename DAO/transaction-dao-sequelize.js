const { Transaction, Account, Customer } = require('../Database/sequelize');
var logger = require('../winston-logger');

exports.getById = function getById(id, callback) {
    Transaction.findById(id).then((transaction) => {
        return callback(null, transaction);
    }).catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.getAll = function getAll(whereClause, callback) {
    Transaction.findAll({
        where: whereClause,
        include:[{
            model: Account,
            include: [{
                model: Customer
            }]
        }]
    }).then((transactions) => {
        return callback(null, transactions);
    }).catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.insert = function insert(data, callback) {
    let transaction = data;
    if(transaction.account == null && transaction.account_number == null) {
        res.json('Data Empty');
    } else {
        if(transaction.account_number == null) {
            transaction.account_number = transaction.account.accountNumber;
        }
    }
    Transaction.create(transaction).then(transaction => {
        return callback(null, transaction);
    }).catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.update = function update(id, data, callback) {
    let transaction = data;
    if(transaction.account == null && transaction.account_number == null) {
        res.json('Data Empty');
    } else {
        if(transaction.account_number == null) {
            transaction.account_number = transaction.account.accountNumber;
        }
    }
    Transaction.update(data, {
        where: {id: data.id},
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
    Transaction.destroy({
        where: {id: id}
    }).then(result => {
        logger.info('result updated');
        logger.info(result);
        return callback(null, id);
    }).catch((error) => {
        logger.error(error);
        return callback(error);
    })
};