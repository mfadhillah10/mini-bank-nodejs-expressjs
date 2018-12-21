var connection = require('../Database/conn');

const sqlGetAll = 'select * from account';
const sqlGetById = 'select * from account where account_number = ?';
const sqlInsert = 'insert into account set ?';
const sqlUpdate = 'update account set ? where account_number = ?';
const sqlDelete = 'delete from account where account_number = ?';

exports.getAll = function getAll(callback) {
    connection.query(sqlGetAll, function(error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};

exports.getById = function getById(id, callback) {
    connection.query(sqlGetById, id, function(error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};

exports.insert = function insert(data, callback) {
    connection.query(sqlInsert, data, function(error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};

exports.update = function update(id, data, callback) {
    connection.query(sqlUpdate, [data, id], function(error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};

exports.del = function del(id, callback) {
    connection.query(sqlDelete, id, function (error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};