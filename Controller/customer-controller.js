var response = require('../Model/res');
var customerDao = require('../DAO/customer-dao');

exports.customers = function(req, res) {
    customerDao.getAll(function(error, rows) {
        if (error) {
            console.log('Error while selecting data: '+error);
            response.err(error, res);
        } else {
            response.ok(rows, res)
        }
    });
};

exports.insertCustomer = function(req, res) {
    customerDao.insert(req.body, function(err, data){
        if (err) {
            console.log('Error while inserting data: '+err);
            response.err(err, res);
        }
        response.ok('Success '+ data.insertId, res);
    });
};

exports.getCustomerById = function(req, res) {
    customerDao.getById(req.params['id'], function(err, data) {
        if (err) {
            console.log('Error while call by ID: '+err);
            response.err(err, res);
        }
        response.ok(data, res);
    });
};

exports.updateCustomer = function(req, res) {
    customerDao.getById(req.body.custnumber, function(err, data) {
        if (err) {
            console.log('Error while deleting by ID: '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Customer not found. ', res);
        } else {
            customerDao.update(req.body.custnumber, req.body, function(err, data) {
                if (err) {
                    console.log('Error while calling by ID: ' +err);
                    response.err(error, res);
                }
                response.ok('Data updated: ' + data.message, res);
            });
        }
    });
};

exports.del = function(req, res) {
    customerDao.getById(req.params['id'], function(err, data) {//check customer exists
        if(err) {
            console.log('Error while calling by ID: '+err);
            response.err(err, res);
        }  else if(data == null){
            response.dataNotFound('Customer not found', res);
        } else {
            customerDao.del(req.params['id'],
            function(err, data) {
                if(err){
                    console.log('Error while calling delete: '+err);
                    response.err(error, res);
                } 
                response.ok(data, res);
            });
        }
    });
};