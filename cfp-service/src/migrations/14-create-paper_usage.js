"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("paper_usages", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      report_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("A3", "A4"),
        allowNull: false,
      },
      activity_data: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("paper_usages", ["report_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("paper_usages");
  },
};
