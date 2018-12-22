var connection = require('../Database/conn');

const sqlGetAll = 'select * from transaction';
const sqlGetById = 'select * from transaction where id = ?';
const sqlInsert = 'insert into transaction set ?';
const sqlUpdate = 'update transaction set ? where id = ?';
const sqlDelete = 'delete from transaction where id = ?';

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
        callback(null, rows[0]);
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