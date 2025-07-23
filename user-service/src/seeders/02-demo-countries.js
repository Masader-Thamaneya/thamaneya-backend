"use strict";

const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const countriesPath = path.join(__dirname, "./data/countries.json");
    const countriesData = JSON.parse(fs.readFileSync(countriesPath, "utf8"));

    const countries = countriesData.map((country) => ({
      ...country,
      created_at: now,
      updated_at: now,
    }));

    await queryInterface.bulkInsert("countries", countries);
  },

  async down(queryInterface, Sequelize) {
    const countriesPath = path.join(__dirname, "./data/countries.json");
    const countriesData = JSON.parse(fs.readFileSync(countriesPath, "utf8"));

    await queryInterface.bulkDelete("countries", {
      code: countriesData.map((s) => s.code),
    });
  },
};
