"use strict";

/* 
[2022, "Carbon dioxide", "kg", 1, 0.001],
      [2023, "Carbon dioxide", "kg", 1, 0.001],
      [2024, "Carbon dioxide", "kg", 1, 0.001],
      [2022, "Carbon tetrachloride", "kg", 1400, 1.4],
      [2023, "Carbon tetrachloride", "kg", 1730, 1.73],
      [2024, "Carbon tetrachloride", "kg", 1730, 1.73],
      [2022, "CFC-11/R11 = trichlorofluoromethane", "kg", 4750, 4.75],
      [2023, "CFC-11/R11 = trichlorofluoromethane", "kg", 4660, 4.66],
      [2024, "CFC-11/R11 = trichlorofluoromethane", "kg", 4660, 4.66],
      [2022, "CFC-113", "kg", 6130, 6.13],
      [2023, "CFC-113", "kg", 5820, 5.82],
      [2024, "CFC-113", "kg", 5820, 5.82],
      [2022, "CFC-114", "kg", 10000, 10],
      [2023, "CFC-114", "kg", 8590, 8.59],
      [2024, "CFC-114", "kg", 8590, 8.59],
      [2022, "CFC-115", "kg", 7370, 7.37],
      [2023, "CFC-115", "kg", 7670, 7.67],
      [2024, "CFC-115", "kg", 7670, 7.67],
      [2022, "CFC-12/R12 = dichlorodifluoromethane", "kg", 10900, 10.9],
      [2023, "CFC-12/R12 = dichlorodifluoromethane", "kg", 10200, 10.2],
      [2024, "CFC-12/R12 = dichlorodifluoromethane", "kg", 10200, 10.2],
      [2022, "CFC-13", "kg", 14400, 14.4],
      [2023, "CFC-13", "kg", 13900, 13.9],
      [2024, "CFC-13", "kg", 13900, 13.9],
       */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const gasesRaw = [
      [2022, "R12", "kg", 10900, 10.9],
      [2023, "R12", "kg", 10200, 10.2],
      [2024, "R12", "kg", 10200, 10.2],

      [2022, "R22", "kg", 1810, 1.81],
      [2023, "R22", "kg", 1760, 1.76],
      [2024, "R22", "kg", 1760, 1.76],

      [2022, "R32", "kg", 1000, 1],
      [2023, "R32", "kg", 1000, 1],
      [2024, "R32", "kg", 1000, 1],

      [2022, "R34", "kg", 1000, 1],
      [2023, "R34", "kg", 1000, 1],
      [2024, "R34", "kg", 1000, 1],

      [2022, "R123", "kg", 1000, 1],
      [2023, "R123", "kg", 1000, 1],
      [2024, "R123", "kg", 1000, 1],

      [2022, "R134A", "kg", 1000, 1],
      [2023, "R134A", "kg", 1000, 1],
      [2024, "R134A", "kg", 1000, 1],

      [2022, "R404", "kg", 1000, 1],
      [2023, "R404", "kg", 1000, 1],
      [2024, "R404", "kg", 1000, 1],

      [2022, "R407A", "kg", 2107, 2.107],
      [2023, "R407A", "kg", 1923, 1.923],
      [2024, "R407A", "kg", 1923, 1.923],

      [2022, "R410A", "kg", 2088, 2.088],
      [2023, "R410A", "kg", 1924, 1.924],
      [2024, "R410A", "kg", 1924, 1.924],
    ];

    // Fetch gas IDs
    const [gases] = await queryInterface.sequelize.query(
      `SELECT id, name FROM gases`
    );
    const gasMap = {};
    gases.forEach((g) => (gasMap[g.name] = g.id));

    // Fetch unit ID for "kg"
    const [[unit]] = await queryInterface.sequelize.query(
      `SELECT id FROM units WHERE symbol = 'kg' OR name = 'kilogram' LIMIT 1`
    );
    const unitId = unit?.id;
    if (!unitId) throw new Error("Unit 'kg' not found in units table");

    // Build the data rows
    const rows = gasesRaw.map(([year, name, _unit, _gwp, ef]) => ({
      gas_id: gasMap[name],
      unit_id: unitId,
      year,
      ef,
    }));

    await queryInterface.bulkInsert("emission_factor_refrigerants", rows);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("emission_factor_refrigerants", null, {});
  },
};
