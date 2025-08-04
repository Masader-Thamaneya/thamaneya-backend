"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("waste_types", {
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
      treatments: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("waste_types");
  },
};
