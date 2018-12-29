const Sequelize = require('sequelize');
const CustomerModel = require('../Model/customer');
const AccountModel = require('../Model/account');
const TransactionModel = require('../Model/transaction');

const sequelize = new Sequelize('bootcamp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Customer = CustomerModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);
Account.belongsTo(Customer, {foreignKey: 'cust_number', targetKey: 'custnumber'});
Transaction.belongsTo(Account, {foreignKey: 'account_number', targetKey: 'accountNumber'});

module.exports = {
  Customer,
  Account,
  Transaction
}
