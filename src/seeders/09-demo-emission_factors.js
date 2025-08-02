"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawData = [
      // Format: [year, fuel_name, unit, ef, wtt_ef]
      [2022, "Natural gas (100% mineral blend)", "tonnes", 2.55917, 0.43258645],
      [2022, "Natural gas (100% mineral blend)", "m3", 0.00203155, 0.0003434],
      [
        2022,
        "Natural gas (100% mineral blend)",
        "kWh (Net CV)",
        0.00020386,
        0.00003446,
      ],
      [
        2022,
        "Natural gas (100% mineral blend)",
        "kWh (Gross CV)",
        0.00018397,
        0.0000311,
      ],
      [2022, "Diesel (100% mineral diesel)", "tonnes", 3.20876, 0.74568125],
      [2022, "Diesel (100% mineral diesel)", "litres", 0.0026988, 0.00062874],
      [
        2022,
        "Diesel (100% mineral diesel)",
        "kWh (Net CV)",
        0.00026939,
        0.00006264,
      ],
      [
        2022,
        "Diesel (100% mineral diesel)",
        "kWh (Gross CV)",
        0.00025321,
        0.00005888,
      ],
      [2022, "Petrol (100% mineral petrol)", "tonnes", 3.1539, 0.81261052],
      [2022, "Petrol (100% mineral petrol)", "litres", 0.0023397, 0.00060283],
      [
        2022,
        "Petrol (100% mineral petrol)",
        "kWh (Net CV)",
        0.00025428,
        0.00006552,
      ],
      [
        2022,
        "Petrol (100% mineral petrol)",
        "kWh (Gross CV)",
        0.00024156,
        0.00006224,
      ],
      [
        2023,
        "Natural gas (100% mineral blend)",
        "tonnes",
        2.581984411,
        0.42316368,
      ],
      [2023, "Natural gas (100% mineral blend)", "m3", 0.00205383, 0.0003366],
      [
        2023,
        "Natural gas (100% mineral blend)",
        "kWh (Net CV)",
        0.000204201,
        0.00003347,
      ],
      [
        2023,
        "Natural gas (100% mineral blend)",
        "kWh (Gross CV)",
        0.000184319,
        0.00003021,
      ],
      [2023, "Diesel (100% mineral diesel)", "tonnes", 3.203911428, 0.7520276],
      [2023, "Diesel (100% mineral diesel)", "litres", 0.002659372, 0.00062409],
      [
        2023,
        "Diesel (100% mineral diesel)",
        "kWh (Net CV)",
        0.000268023,
        0.00006291,
      ],
      [
        2023,
        "Diesel (100% mineral diesel)",
        "kWh (Gross CV)",
        0.000251927,
        0.00005913,
      ],
      [2023, "Petrol (100% mineral petrol)", "tonnes", 3.154082126, 0.81593523],
      [2023, "Petrol (100% mineral petrol)", "litres", 0.002345025, 0.00060664],
      [
        2023,
        "Petrol (100% mineral petrol)",
        "kWh (Net CV)",
        0.000254435,
        0.00006582,
      ],
      [
        2023,
        "Petrol (100% mineral petrol)",
        "kWh (Gross CV)",
        0.000241715,
        0.00006253,
      ],
      [
        2024,
        "Natural gas (100% mineral blend)",
        "tonnes",
        2.59046441,
        0.42316368,
      ],
      [2024, "Natural gas (100% mineral blend)", "m3", 0.00206318, 0.0003366],
      [
        2024,
        "Natural gas (100% mineral blend)",
        "kWh (Net CV)",
        0.0002044,
        0.00003347,
      ],
      [
        2024,
        "Natural gas (100% mineral blend)",
        "kWh (Gross CV)",
        0.00018449,
        0.00003021,
      ],
      [2024, "Diesel (100% mineral diesel)", "tonnes", 3.20391143, 0.7520276],
      [2024, "Diesel (100% mineral diesel)", "litres", 0.00266155, 0.00062409],
      [
        2024,
        "Diesel (100% mineral diesel)",
        "kWh (Net CV)",
        0.00026808,
        0.00006291,
      ],
      [
        2024,
        "Diesel (100% mineral diesel)",
        "kWh (Gross CV)",
        0.00025197,
        0.00005913,
      ],
      [2024, "Petrol (100% mineral petrol)", "tonnes", 3.15408213, 0.81593523],
      [2024, "Petrol (100% mineral petrol)", "litres", 0.00235372, 0.00060664],
      [
        2024,
        "Petrol (100% mineral petrol)",
        "kWh (Net CV)",
        0.0002546,
        0.00006582,
      ],
      [
        2024,
        "Petrol (100% mineral petrol)",
        "kWh (Gross CV)",
        0.00024186,
        0.00006253,
      ],
    ];

    // Fetch fuel and unit mappings
    const [fuels] = await queryInterface.sequelize.query(
      `SELECT id, name FROM fuels`
    );
    const [units] = await queryInterface.sequelize.query(
      `SELECT id, name FROM units`
    );

    const fuelMap = Object.fromEntries(fuels.map((f) => [f.name, f.id]));
    const unitMap = Object.fromEntries(units.map((u) => [u.name, u.id]));

    const rows = rawData.map(([year, fuelName, unitName, ef, wtt_ef]) => {
      const fuel_id = fuelMap[fuelName];
      const unit_id = unitMap[unitName];

      if (!fuel_id) throw new Error(`Fuel not found: ${fuelName}`);
      if (!unit_id) throw new Error(`Unit not found: ${unitName}`);

      return { fuel_id, unit_id, year, ef, wtt_ef };
    });

    await queryInterface.bulkInsert("emission_factor_fuels", rows, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("emission_factor_fuels", null, {});
  },
};
