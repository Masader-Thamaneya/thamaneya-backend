"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("emission_factor_refrigerants", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      gas_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "gases",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "units",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ef: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("emission_factor_refrigerants", ["year"]);
    await queryInterface.addIndex(
      "emission_factor_refrigerants",
      ["gas_id", "unit_id", "year"],
      {
        unique: true,
        name: "unique_gas_unit_year",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("emission_factor_refrigerants");
  },
};
