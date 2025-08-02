"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("emission_factor_goods", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      good_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "goods",
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

    await queryInterface.addIndex("emission_factor_goods", ["good_id"]);
    await queryInterface.addIndex("emission_factor_goods", ["unit_id"]);
    await queryInterface.addIndex("emission_factor_goods", ["year"]);
    await queryInterface.addIndex(
      "emission_factor_goods",
      ["good_id", "unit_id", "year"],
      {
        unique: true,
        name: "unique_good_unit_year",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("emission_factor_goods", ["good_id"]);
    await queryInterface.removeIndex("emission_factor_goods", ["unit_id"]);
    await queryInterface.removeIndex("emission_factor_goods", ["year"]);
    await queryInterface.removeIndex(
      "emission_factor_goods",
      ["good_id", "unit_id", "year"],
      {
        name: "unique_good_unit_year",
      }
    );
    await queryInterface.dropTable("emission_factor_goods");
  },
};
