var connection = require('../Database/conn');

const sqlGetById = 'select * from customer where custnumber = ?';
const sqlUpdate = 'update customer set ? where custnumber = ?';
const sqlGetAll = 'select * from customer';
const sqlInsert = 'insert into customer set ?';
const sqlDelete = 'delete from customer where custnumber = ?';

exports.getById = function getById(id, callback) {
    connection.query(sqlGetById, id, function(error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows[0]);
    });
};

exports.getAll = function getAll(callback) {
    connection.query(sqlGetAll, function (error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};

exports.insert = function insert(data, callback) {
    connection.query(sqlInsert, data, function (error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};

exports.update = function update(id, data, callback) {
    connection.query(sqlUpdate, [data, id], function (error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};

exports.del = function del(id, callback) {
    connection.query(sqlDelete, id, function(error, rows) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};