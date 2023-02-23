// Model
// Imports
const bcrypt = require('bcrypt');

// Functions
function hashPassword(user, options) {
    const SALT_FACTOR = 8;
    if(!user.changed('password')) {
        return;
    }
    return bcrypt.genSalt(SALT_FACTOR)
    .then(salt => bcrypt.hash(user.password, salt, null))
    .then(hash => {
        user.setDataValue('password', hash);
    });
}
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(250),
            unique: false
        },
        last_name: {
            type: DataTypes.STRING(250),
            unique: false
        },
        email: {
            type: DataTypes.STRING(250),
            unique: true
        },
        password: {
            type:  DataTypes.TEXT('long'),
            unique: false
        },
        token: {
            type: DataTypes.TEXT('long'),
            unique: false
        },
    }, {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        }
    })

    User.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password);
    }
    

    return User;
};