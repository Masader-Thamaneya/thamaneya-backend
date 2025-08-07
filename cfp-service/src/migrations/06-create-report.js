"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reports", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: true, // Change in production
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          "draft",
          "unverified",
          "submitted",
          "verified",
          "revision_required",
          "archived"
        ),
        allowNull: false,
        defaultValue: "draft",
      },
      number_of_facilities: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      area_unit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number_of_employees: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      revenue: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      revenue_currency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reporting_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      base_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      purchased_electricity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      purchased_chilled_water: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      water_consumption: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      scope_1_emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      scope_2_emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      scope_3_emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      cat_1_emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      cat_3_emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      cat_5_emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      cat_7_emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      total_emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      s1_s2_emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      s1_s2_per_employee: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      s1_s2_per_area: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      s1_s2_per_revenue: {
        type: Sequelize.FLOAT,
        allowNull: true,
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

    // Add indexes
    await queryInterface.addIndex("reports", ["company_id"]);
    await queryInterface.addIndex("reports", ["created_by"]);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop enum type manually before dropping table to avoid errors in Postgres
    await queryInterface.removeIndex("reports", ["company_id"]);
    await queryInterface.removeIndex("reports", ["created_by"]);
    await queryInterface.dropTable("reports");
  },
};
