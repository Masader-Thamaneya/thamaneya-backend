"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("emission_factor_waste", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      waste_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "waste_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      treatment: {
        type: Sequelize.ENUM(
          "Recycled",
          "Combustion",
          "Composting",
          "Landfill"
        ),
        allowNull: false,
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
      ef: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("emission_factor_waste", ["waste_type_id"]);
    await queryInterface.addIndex("emission_factor_waste", ["treatment"]);
    await queryInterface.addIndex(
      "emission_factor_waste",
      ["waste_type_id", "treatment"],
      {
        unique: true,
        name: "unique_waste_treatment",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("emission_factor_waste");
  },
};
