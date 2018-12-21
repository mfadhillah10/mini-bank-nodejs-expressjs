var response = require('../Model/res');
var accountDao = require('../DAO/account-dao');

exports.accounts = function(req, res) {
    accountDao.getAll(function(error, rows) {
        if (error) {
            console.log('Error '+error);
            response.err(error, res);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.getAccountById = function(req, res) {
    accountDao.getById(req.params['id'], function(err, rows) {
        if (err) {
            console.log('Error '+err);
            response.err(err,res);
        }
        response.ok(data, res);
    });
};

exports.insertAccount = function(req, res) {
    accountDao.insert(req.body, function(err, rows) {
        if (err) {
            console.log('Error ', +err);
            response.err(err, res);
        }
        response.ok(rows, res);
    });
};

exports.updateAccount = function(req, res) {
    accountDao.getById(req.body.account_number, function(err, data) {
        if (err) {
            console.log('Error '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Not found ', res);
        } else {
            accountDao.update(req.body.account_number, req.body, function(err, data) {
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
    accountDao.getById(req.params['id'], function(err, data) {
        if (err) {
            console.log('Error '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Not found ', res);
        } else {
            accountDao.del(req.params['id'], function(err, data) {
                if (err) {
                    console.log('Error '+err);
                    response.err(error, res);
                }
                response.ok(data, res);
            });
        }
    });
};