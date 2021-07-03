"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      House.belongsTo(models.Location, {
        as: "city",
        foreignKey: {
          name: "city_id",
        },
      });

      House.hasOne(models.Transaction, {
        as: "trx_id",
        foreignKey: {
          name: "house_id",
        },
      });
    }
  }
  House.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      price: DataTypes.INTEGER,
      typeRent: DataTypes.STRING,
      ameneties: DataTypes.STRING,
      bedroom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "House",
      tableName: "houses",
    }
  );
  return House;
};
