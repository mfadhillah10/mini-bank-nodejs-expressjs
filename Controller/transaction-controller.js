var response = require('../Model/res');
var transactionDao = require('../DAO/transaction-dao-sequelize');
var logger = require('../winston-logger');
var util = require('util');

exports.transactions = function(req, res) {
    let whereClause = {};
    if(req.query.id) {
        whereClause.id = req.query.id;
    }
    if(req.query.type) {
        whereClause.type = req.query.type;
    }
    if(req.query.amount) {
        whereClause.amount = req.query.amount;
    }
    if(req.query.amountSign) {
        whereClause.amountSign = req.query.amountSign;
    }
    if(req.query.accountNumber) {
        whereClause.account_number = req.query.accountNumber;
    }
    transactionDao.getAll(whereClause, function(error, rows) {
        if (error) {
            logger.error('Error '+error);
            response.err(error, res);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.getTransactionById = function(req, res) {
    transactionDao.getById(req.params['id'], function(err, data) {
        if (err) {
            logger.info('Error ' + err);
            response.err(err, res);
        } else if (data == null) {
            logger.error('Error cuy ' + err);
            response.dataNotFound('Data not found', res);
        }
        response.ok(data, res);
    });
};

exports.insertTransaction = function(req, res) {
    logger.info('request for insert: ');
    logger.debug(req.body);
    transactionDao.insert(req.body, function(err, rows) {
        if (err) {
            logger.error('Error ', +err);
            response.err(err, res);
        }
        response.ok(rows, res);
    });
};

exports.updateTransaction = function(req, res) {
    logger.info('request for update: ');
    logger.debug(req.body);
    transactionDao.getById(req.body.id, function(err, data) {
        if (err) {
            logger.error('Error '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Not found ', res);
        } else {
            transactionDao.update(req.body.id, req.body, function(err, data) {
                if (err) {
                    logger.error('Error '+err);
                    response.err(err, res);
                }
                response.ok('Updated ' + data.message, res);
            });
        }
    });
};

exports.del = function(req, res) {
    logger.info(util.format('deleting transaction id %s', req.params['id']));
    transactionDao.getById(req.params['id'], function(err, data) {
        if (err) {
            logger.error('Error '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Not found ', res);
        } else {
            transactionDao.del(req.params['id'], function(err, data) {
                if (err) {
                    logger.error('Error '+err);
                    response.err(error, res);
                }
                response.ok(data, res);
            });
        }
    });
};