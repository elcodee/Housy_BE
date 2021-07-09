"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class House_img extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      House_img.hasOne(models.House, {
        as: "house",
        foreignKey: "img_id",
      });
    }
  }
  House_img.init(
    {
      thumb: DataTypes.STRING,
      detail_one: DataTypes.STRING,
      detail_two: DataTypes.STRING,
      detail_three: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "House_img",
      tableName: "house_imgs",
    }
  );
  return House_img;
};
