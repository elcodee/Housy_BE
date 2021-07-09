"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.House, {
        as: "house",
        foreignKey: {
          name: "house_id",
        },
      });

      Transaction.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  Transaction.init(
    {
      house_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      checkin: DataTypes.DATE,
      checkout: DataTypes.DATE,
      total: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
    }
  );
  return Transaction;
};
