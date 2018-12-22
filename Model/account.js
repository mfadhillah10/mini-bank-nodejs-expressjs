module.exports = (sequelize, type) => {
    return sequelize.define('account', {
        accountNumber: {
            field: 'account_number',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        openDate: {
            field: 'open_date',
            type: type.DATE
        },
        balance: type.DECIMAL,
        custNumber: {
            field: 'cust_number',
            type: type.INTEGER,
            onDelete: 'CASCADE',

            references: {
                model: 'customer',
                key: 'custnumber'
            }
        }
    }, {
        tableName: 'account',
        timestamps: false
    })
}