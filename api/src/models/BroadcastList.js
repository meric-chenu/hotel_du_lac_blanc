module.exports = (sequelize,DataTypes) => {
    const BroadcastList = sequelize.define('BroadcastList',{
        id_broadcastList: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        email: {
            type: DataTypes.STRING(250),
            unique: true,
            allowNull: false
        }
    })
    return BroadcastList;
};