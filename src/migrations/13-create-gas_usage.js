"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("refrigerant_usage", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      report_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      gas_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      activity_data: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });

    await queryInterface.addIndex(
      "refrigerant_usage",
      ["report_id", "gas_id"],
      {
        unique: true,
        name: "refrigerant_usage_report_gas",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("refrigerant_usage");
  },
};
