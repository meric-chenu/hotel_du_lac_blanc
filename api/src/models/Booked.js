module.exports = (sequelize,DataTypes) => {
    const Booked = sequelize.define('Booked',{
        id_booked: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        booked : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false
        }
    })
    return Booked;
};