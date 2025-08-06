"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Map of waste_type name → ID (assuming you’ve seeded waste_types first)
    const wasteTypes = await queryInterface.sequelize.query(
      `SELECT id, name FROM wastes;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const units = await queryInterface.sequelize.query(
      `SELECT id FROM units WHERE name = 'tonnes' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const unitId = units[0]?.id;

    const wasteTypeMap = {};
    for (const wt of wasteTypes) {
      wasteTypeMap[wt.name] = wt.id;
    }

    // Data: [wasteTypeName, treatment, kgCO2e]
    const dataKg = [
      ["Aggregates", "Recycled", 0.98485],
      ["Aggregates", "Landfill", 1.23393],
      ["Average construction", "Recycled", 0.98485],
      ["Average construction", "Combustion", 6.41061],
      ["Asbestos", "Landfill", 5.91325],
      ["Asphalt", "Recycled", 0.98485],
      ["Asphalt", "Landfill", 1.23393],
      ["Concrete", "Recycled", 0.98485],
      ["Concrete", "Landfill", 1.23393],
      ["Insulation", "Recycled", 0.98485],
      ["Insulation", "Landfill", 1.23393],
      ["Metals", "Recycled", 0.98485],
      ["Metals", "Landfill", 1.26435],
      ["Soils", "Recycled", 0.98485],
      ["Soils", "Landfill", 19.51726],
      ["Mineral oil", "Recycled", 6.41061],
      ["Mineral oil", "Combustion", 6.41061],
      ["Plasterboard", "Recycled", 6.41061],
      ["Plasterboard", "Landfill", 71.95],
      ["Tyres", "Recycled", 6.41061],
      ["Wood", "Recycled", 6.41061],
      ["Wood", "Combustion", 6.41061],
      ["Wood", "Composting", 8.88386],
      ["Wood", "Landfill", 925.24423],

      ["Books", "Recycled", 6.41061],
      ["Books", "Combustion", 6.41061],
      ["Books", "Composting", 8.88386],
      ["Books", "Landfill", 1164.39015],

      ["Glass", "Recycled", 6.41061],
      ["Glass", "Combustion", 6.41061],
      ["Glass", "Landfill", 8.88386],

      ["Clothing", "Recycled", 6.41061],
      ["Clothing", "Combustion", 6.41061],
      ["Clothing", "Landfill", 496.68303],

      ["Household residual waste", "Combustion", 6.41061],
      ["Household residual waste", "Landfill", 497.04416],

      ["Organic: food and drink waste", "Combustion", 6.41061],
      ["Organic: food and drink waste", "Composting", 8.88386],
      ["Organic: food and drink waste", "Landfill", 700.20961],

      ["Organic: garden waste", "Combustion", 6.41061],
      ["Organic: garden waste", "Composting", 8.88386],
      ["Organic: garden waste", "Landfill", 646.60632],

      ["Organic: mixed food and garden waste", "Combustion", 6.41061],
      ["Organic: mixed food and garden waste", "Composting", 8.88386],
      ["Organic: mixed food and garden waste", "Landfill", 655.9869],

      ["Commercial and industrial waste", "Combustion", 6.41061],
      ["Commercial and industrial waste", "Landfill", 520.3342],

      ["WEEE - fridges and freezers", "Landfill", 8.88386],
      ["WEEE - large", "Combustion", 6.41061],
      ["WEEE - large", "Landfill", 8.88386],
      ["WEEE - mixed", "Combustion", 6.41061],
      ["WEEE - mixed", "Landfill", 8.88386],
      ["WEEE - small", "Combustion", 6.41061],
      ["WEEE - small", "Landfill", 8.88386],
      ["Batteries", "Landfill", 8.88386],

      ["Metal: aluminium cans and foil (excl. forming)", "Recycled", 6.41061],
      ["Metal: aluminium cans and foil (excl. forming)", "Combustion", 6.41061],
      ["Metal: aluminium cans and foil (excl. forming)", "Landfill", 8.88386],

      ["Metal: mixed cans", "Recycled", 6.41061],
      ["Metal: mixed cans", "Combustion", 6.41061],
      ["Metal: mixed cans", "Landfill", 8.88386],

      ["Metal: scrap metal", "Recycled", 6.41061],
      ["Metal: scrap metal", "Combustion", 6.41061],
      ["Metal: scrap metal", "Landfill", 8.88386],

      ["Metal: steel cans", "Recycled", 6.41061],
      ["Metal: steel cans", "Combustion", 6.41061],
      ["Metal: steel cans", "Landfill", 8.88386],

      ["Plastics: PET (incl. forming)", "Recycled", 6.41061],
      ["Plastics: PET (incl. forming)", "Combustion", 6.41061],
      ["Plastics: PET (incl. forming)", "Landfill", 8.88386],

      ["Paper and board: paper", "Recycled", 6.41061],
      ["Paper and board: paper", "Combustion", 6.41061],
      ["Paper and board: paper", "Composting", 8.88386],
      ["Paper and board: paper", "Landfill", 1164.39015],
    ];

    const records = dataKg
      .map(([wasteName, treatment, efKg]) => ({
        waste_id: wasteTypeMap[wasteName],
        treatment,
        unit_id: unitId,
        ef: parseFloat((efKg / 1000).toFixed(6)),
      }))
      .filter((e) => e.waste_id); // only keep records with valid waste_type_id

    await queryInterface.bulkInsert("emission_factor_waste", records);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("emission_factor_waste", null, {});
  },
};
