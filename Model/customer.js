module.exports = (sequelize, type) => {
    return sequelize.define('customer', {
        custnumber: {
            // field: 'custnumber',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: type.STRING,
        lastname: type.STRING,
        birthdate: type.DATE,
        username: type.STRING,
        password: type.STRING,
        phonenumber: type.INTEGER,
        phonetype: type.STRING
    }, {
        tableName: 'customer',
        timestamps: false
    })
}