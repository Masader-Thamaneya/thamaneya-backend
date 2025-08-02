"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const goods = await queryInterface.sequelize.query(
      `SELECT id, name FROM goods;`
    );
    const goodsMap = Object.fromEntries(goods[0].map((g) => [g.name, g.id]));

    // Fetch units and map by symbol
    const units = await queryInterface.sequelize.query(
      `SELECT id, symbol FROM units;`
    );
    const unitMap = Object.fromEntries(units[0].map((u) => [u.symbol, u.id]));

    // Define emission factors with symbols instead of hardcoded unit_ids
    const data = [
      { name: "Electricity", ef: 0.42635, symbol: "kWh" },
      { name: "PV Generation", ef: 0.42635, symbol: "kWh" },
      { name: "Water", ef: 0.00015, symbol: "m³" },
      { name: "Wastewater treatment", ef: 0.00003, symbol: "m³" },
      { name: "Paper", ef: 0.9194, symbol: "t" },
      { name: "Plastic", ef: 3.11629, symbol: "t" },
      { name: "Ink", ef: 0.0048, symbol: "toner" },
      { name: "Office waste", ef: 0.46705, symbol: "t" },
      { name: "Shredded Paper Waste", ef: 0.02129, symbol: "t" },
      { name: "Average car, petrol", ef: 0.00017, symbol: "p.km" },
      { name: "Average car, petrol (WTT)", ef: 0.00005, symbol: "p.km" },
      { name: "Public transp.(PT) Average bus", ef: 0.0001, symbol: "p.km" },
      { name: "PT. Average bus (WTT)", ef: 0.00002, symbol: "p.km" },
      { name: "Average MC", ef: 0.00011, symbol: "p.km" },
      { name: "Average MC (WTT)", ef: 0.00003, symbol: "p.km" },
    ];

    const year = 2024;
    const records = data.map((item) => {
      const good_id = goodsMap[item.name];
      const unit_id = unitMap[item.symbol];

      if (!good_id || !unit_id) {
        throw new Error(
          `Missing good_id or unit_id for ${item.name} (${item.symbol})`
        );
      }

      return {
        good_id,
        unit_id,
        ef: item.ef,
        year,
      };
    });

    await queryInterface.bulkInsert("emission_factor_goods", records);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("goods", null, {});
  },
};
