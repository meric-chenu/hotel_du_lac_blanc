module.exports = (sequelize,DataTypes) => {
    const Services = sequelize.define('Services',{
        id_services: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        services: {
            type: DataTypes.TEXT('long'),
            unique: false
        }
    })
    return Services;
};