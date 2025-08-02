"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("units", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
      },
      name_ar: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
      },
      symbol: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      symbol_ar: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("units");
  },
};
