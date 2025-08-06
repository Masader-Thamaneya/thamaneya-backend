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
    });

    await queryInterface.addIndex("emission_factor_refrigerants", ["gas_id"]);
    await queryInterface.addIndex("emission_factor_refrigerants", ["unit_id"]);
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
    await queryInterface.removeIndex("emission_factor_refrigerants", [
      "gas_id",
    ]);
    await queryInterface.removeIndex("emission_factor_refrigerants", [
      "unit_id",
    ]);
    await queryInterface.removeIndex("emission_factor_refrigerants", ["year"]);
    await queryInterface.removeIndex(
      "emission_factor_refrigerants",
      ["gas_id", "unit_id", "year"],
      {
        name: "unique_gas_unit_year",
      }
    );
    await queryInterface.dropTable("emission_factor_refrigerants");
  },
};
