"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasOne(models.User, {
        as: "user",
        foreignKey: {
          name: "role_id",
        },
      });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
    }
  );
  return Role;
};