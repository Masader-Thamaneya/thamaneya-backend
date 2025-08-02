"use strict";

const { symbol } = require("joi");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const units = [
      { name: "tonnes", name_ar: "أطنان", symbol: "t", symbol_ar: "ط" },
      {
        name: "toner",
        name_ar: "خرطوشة حبر",
        symbol: "toner",
        symbol_ar: "خرطوشة",
      },

      { name: "litres", name_ar: "لترات", symbol: "L", symbol_ar: "ل" },
      {
        name: "kWh (Net CV)",
        name_ar: "كيلو واط ساعي (صافي القيمة الحرارية)",
        symbol: "kWh.N",
        symbol_ar: "ك.و.س (ص)",
      },
      {
        name: "kWh (Gross CV)",
        name_ar: "كيلو واط ساعي (إجمالي القيمة الحرارية)",
        symbol: "kWh.G",
        symbol_ar: "ك.و.س (ج)",
      },
      { name: "kg", name_ar: "كجم", symbol: "kg", symbol_ar: "كجم" },
      { name: "m", name_ar: "متر", symbol: "m", symbol_ar: "م" },
      { name: "m2", name_ar: "متر مربع", symbol: "m²", symbol_ar: "م²" },
      { name: "m3", name_ar: "متر مكعب", symbol: "m³", symbol_ar: "م³" },
      {
        name: "kWh",
        name_ar: "كيلو واط ساعي",
        symbol: "kWh",
        symbol_ar: "ك.و.س",
      },
      { name: "A3 Paper", name_ar: "ورق A3", symbol: "A3", symbol_ar: "A3" },
      { name: "A4 Paper", name_ar: "ورق A4", symbol: "A4", symbol_ar: "A4" },
      {
        name: "km per person",
        name_ar: "كيلوميتر لكل شخص",
        symbol: "p.km",
        symbol_ar: "ش.كم",
      },
    ];

    await queryInterface.bulkInsert("units", units);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("units", null, {});
  },
};
