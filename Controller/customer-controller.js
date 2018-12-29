var response = require('../Model/res');
var customerDao = require('../DAO/customer-dao-sequelize');
var logger = require('../winston-logger');
var util = require('util');

exports.customers = function(req, res) {
    customerDao.getAll(function(error, rows) {
        if (error) {
            logger.error('Error while selecting data: '+error);
            response.err(error, res);
        } else {
            response.ok(rows, res);
            // return res.json(rows);
        }
    });
};

exports.insertCustomer = function(req, res) {
    customerDao.insert(req.body, function(err, data){
        if (err) {
            logger.error('Error while inserting data: '+err);
            response.err(err, res);
        }
        response.ok('Success '+ data.customerNumber, res);
        // return res.json(data.custnumber);
    });
};

exports.getCustomerById = function(req, res) {
    customerDao.getById(req.params['id'], function(err, data) {
        if (err) {
            logger.error('Error while call by ID: '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Data not found ', res);
            logger.error('Error cuy ' + err);
        }
        response.ok(data, res);
        // return res.json(data);
    });
};

exports.updateCustomer = function(req, res) {
    logger.info('Request for update: ');
    logger.debug(req.body);
    customerDao.getById(req.body.custnumber, function(err, data) {
        if (err) {
            logger.error('Error while updating by ID: '+err);
            response.err(err, res);
        } else if (data == null) {
            response.dataNotFound('Customer not found. ', res);
        } else {
            customerDao.update(req.body.custnumber, req.body, function(err, data) {
                if (err) {
                    logger.error('Error while calling by ID: ' +err);
                    response.err(error, res);
                }
                response.ok('Data updated: ' + data.customerNumber, res);
                // return res.json(data.custnumber);
            });
        }
    });
};

exports.del = function(req, res) {
    logger.info(util.format('Deleting customer with ID %s', req.params['id']));
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
                response.ok('Success deleted with ID: ' + data, res);
                // return res.json(data);
            });
        }
    });
};