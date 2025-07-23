"use strict";

import { faker } from "@faker-js/faker";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const companies = [];
  const now = new Date();

  for (let i = 0; i < 20; i++) {
    companies.push({
      name: faker.company.name(),
      sector_id: Math.floor(Math.random() * 10) + 1,
      primary_country_id: Math.floor(Math.random() * 240) + 1,
      country_id: Math.floor(Math.random() * 240) + 1,
      city: faker.location.city(),
      size: faker.helpers.arrayElement([
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1001-5000",
        "5001-10000",
        "10000+",
      ]),
      website: faker.internet.url(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      description: faker.lorem.paragraph(),
      is_seeded: true,
      created_at: now,
      updated_at: now,
    });
  }
  await queryInterface.bulkInsert("companies", companies);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("companies", { is_seeded: true });
}
