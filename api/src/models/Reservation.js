module.exports = (sequelize,DataTypes) => {
    const Reservation = sequelize.define('Reservation',{
        id_reservation: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
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
        }
    })
    return Reservation;
};