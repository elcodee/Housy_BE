"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      house_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "houses",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      checkin: {
        type: Sequelize.DATE,
      },
      checkout: {
        type: Sequelize.DATE,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      attachment: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transactions");
  },
};