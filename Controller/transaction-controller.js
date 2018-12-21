var response = require('../Model/res');
var transactionDao = require('../DAO/transaction-dao');

exports.transactions = function(req, res) {
    transactionDao.getAll(function(error, rows) {
        if (error) {
            console.log('Error '+error);
            response.err(error, res);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.getTransactionById = function(req, res) {
    transactionDao.getById(req.params['id'], function(err, rows) {
        if (err) {
            console.log('Error '+err);
            response.err(err,res);
        }
        response.ok(data, res);
    });
};

exports.insertTransaction = function(req, res) {
    transactionDao.insert(req.body, function(err, rows) {
        if (err) {
            console.log('Error ', +err);
            response.err(err, res);
        }
        response.ok(rows, res);
    });
};

exports.updateTransaction = function(req, res) {
    transactionDao.getById(req.body.id, function(err, data) {
        if (err) {
            console.log('Error '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Not found ', res);
        } else {
            transactionDao.update(req.body.id, req.body, function(err, data) {
                if (err) {
                    console.log('Error '+err);
                    response.err(err, res);
                }
                response.ok('Updated ' + data.message, res);
            });
        }
    });
};

exports.del = function(req, res) {
    transactionDao.getById(req.params['id'], function(err, data) {
        if (err) {
            console.log('Error '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Not found ', res);
        } else {
            transactionDao.del(req.params['id'], function(err, data) {
                if (err) {
                    console.log('Error '+err);
                    response.err(error, res);
                }
                response.ok(data, res);
            });
        }
    });
};