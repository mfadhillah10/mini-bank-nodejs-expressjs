var response = require('../Model/res');
var accountDao = require('../DAO/account-dao-sequelize');
var logger = require('../winston-logger');
var util = require('util');

exports.accounts = function(req, res) {
    accountDao.getAll(function(error, rows) {
        if (error) {
            logger.error('Error '+error);
            response.err(error, res);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.getAccountById = function(req, res) {
    accountDao.getById(req.params['id'], function(err, data) {
        if (err) {
            logger.info('Error '+err);
            response.err(err, res);
        } else if (data == null) {
            logger.error('Error cuy ' + err);
            response.dataNotFound('Data not found ', res);
        }
        response.ok(data, res);
    });
};

exports.insertAccount = function(req, res) {
    logger.info('request for insert: ');
    logger.debug(req.body);
    accountDao.insert(req.body, function(err, data) {
        if (err) {
            logger.error('Error ', +err);
            response.err(err, res);
        }
        response.ok('data inserted: '+data.accountNumber, res);
    });
};

exports.updateAccount = function(req, res) {
    logger.info('request for update');
    logger.debug(req.body);
    accountDao.getById(req.body.accountNumber, function(err, data) {
        if (err) {
            logger.error('Error '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Not found ', res);
        } else {
            accountDao.update(req.body.accountNumber, req.body, function(err, data) {
                if (err) {
                    logger.error('Error '+err);
                    response.err(err, res);
                }
                response.ok('Updated ' + data.accountNumber, res);
            });
        }
    });
};

exports.del = function(req, res) {
    logger.info(util.format('deleting account id %s', req.params['id']));
    accountDao.getById(req.params['id'], function(err, data) {
        if (err) {
            logger.error('Error '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Not found ', res);
        } else {
            accountDao.del(req.params['id'], function(err, data) {
                if (err) {
                    logger.error('Error '+err);
                    response.err(error, res);
                }
                response.ok('customer deleted with ID: '+data, res);
            });
        }
    });
};