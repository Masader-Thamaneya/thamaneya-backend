"use strict";
import bcrypt from "bcrypt";

const users = [
  { name: "Test User", email: "test@email.com", password: "Password123" },
  { name: "Alice", email: "alice@example.com", password: "Password123" },
  { name: "Bob", email: "bob@example.com", password: "Secret456" },
];

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const now = new Date();

  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      name: user.name,
      email: user.email,
      password_hash: await bcrypt.hash(user.password, 10),
      company_id: Math.floor(Math.random() * 20) + 1,
      created_at: now,
      updated_at: now,
    }))
  );
  await queryInterface.bulkInsert("users", hashedUsers);
}
export async function down(queryInterface, Sequelize) {
  const emailsToDelete = users.map((user) => user.email);
  await queryInterface.bulkDelete(
    "users",
    {
      email: emailsToDelete,
    },
    {}
  );
}
