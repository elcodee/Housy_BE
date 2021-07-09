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
      House.belongsTo(models.House_img, {
        as: "image",
        foreignKey: "img_id",
      });

      House.belongsTo(models.Location, {
        as: "city",
        foreignKey: "city_id",
      });

      House.hasOne(models.Transaction, {
        as: "trx",
        foreignKey: "house_id",
      });
    }
  }
  House.init(
    {
      img_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      price: DataTypes.INTEGER,
      typeRent: DataTypes.STRING,
      ameneties: DataTypes.STRING,
      bedroom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      spacious: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "House",
      tableName: "houses",
    }
  );
  return House;
};
