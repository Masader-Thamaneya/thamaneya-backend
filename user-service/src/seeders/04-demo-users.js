"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Password123", 10); // change as needed

    await queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        name: "test user",
        email: "test@email.com",
        password_hash: hashedPassword,
        company_id: null,
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Admin User",
        email: "admin@example.com",
        password_hash: hashedPassword,
        company_id: null, // or provide a valid UUID if company exists
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Manager User",
        email: "manager@example.com",
        password_hash: hashedPassword,
        company_id: null,
        role: "manager",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Employee User",
        email: "employee@example.com",
        password_hash: hashedPassword,
        company_id: null,
        role: "employee",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
