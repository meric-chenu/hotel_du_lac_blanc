module.exports = (sequelize,DataTypes) => {
    const Bedroom = sequelize.define('Bedroom',{
        id_bedroom: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(250),
            unique: true,
            allowNull: false
        },
        capacity: {
            type: DataTypes.STRING(250),
            unique: false,
            allowNull: false
        },
        air_conditioned: {
            type: DataTypes.BOOLEAN
        },
        wifi: {
            type: DataTypes.BOOLEAN
        },
        television: {
            type: DataTypes.BOOLEAN
        },
        fridge: {
            type: DataTypes.BOOLEAN
        },
        dishes:{
            type: DataTypes.BOOLEAN
        },
        phone: {
            type: DataTypes.BOOLEAN
        },
        drink: {
            type: DataTypes.BOOLEAN
        },
        begin_price: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false
        },

    })
    return Bedroom;
};