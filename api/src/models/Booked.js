module.exports = (sequelize,DataTypes) => {
    const Booked = sequelize.define('Booked',{
        id_booked: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_bedroom : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        booked : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false
        },
        id_reservation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false
        }
    })
    return Booked;
};