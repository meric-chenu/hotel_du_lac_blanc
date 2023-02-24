module.exports = (sequelize,DataTypes) => {
    const Reservation = sequelize.define('Reservation',{
        id_reservation: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        arrivee: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false,
        },
        depart: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false,
        },
        adult_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        child_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        id_booked: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        email: {
            type: DataTypes.STRING(250),
            unique: false
        }
    })
    return Reservation;
};