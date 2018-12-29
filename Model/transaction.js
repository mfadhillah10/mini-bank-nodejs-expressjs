module.exports = (sequelize, type) => {
    return sequelize.define('transaction', {
        id: {
            field: 'id',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            field: 'type',
            type: type.STRING
        },
        amount: type.STRING,
        amountSign: {
            field: 'amount_sign',
            type: type.STRING
        },
        account_number: {
            type: type.INTEGER,
            onDelete: 'CASCADE',

            references: {
                model: 'account',
                key: 'account_number'
            }
        }
    }, {
        tableName: 'transaction',
        timestamps: false
    })
}