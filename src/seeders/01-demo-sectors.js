"use strict";

const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const sectorsPath = path.join(__dirname, "./data/sectors.json");
    const sectorsData = JSON.parse(fs.readFileSync(sectorsPath, "utf8"));

    const sectors = sectorsData.map((sector) => ({
      ...sector,
      created_at: now,
      updated_At: now,
    }));

    await queryInterface.bulkInsert("sectors", sectors);
  },

  async down(queryInterface, Sequelize) {
    const sectorsPath = path.join(__dirname, "./data/sectors.json");
    const sectorsData = JSON.parse(fs.readFileSync(sectorsPath, "utf8"));

    await queryInterface.bulkDelete("sectors", {
      name: sectorsData.map((s) => s.name),
    });
  },
};
