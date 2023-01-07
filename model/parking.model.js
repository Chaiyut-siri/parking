// Model parking 
module.exports = (sequelize, Sequelize) => {
    const Parking = sequelize.define("parking", {
      slot: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      plate: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      car_size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_available: {
        type: Sequelize.INTEGER,
        allowNull: false
      } 
    },{
      freezeTableName: true,
    }); 
    return Parking;
};