"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const gases = [
      {
        name: "Carbon dioxide",
        name_ar: "ثاني أكسيد الكربون",
      },
      {
        name: "Carbon tetrachloride",
        name_ar: "رباعي كلوريد الكربون",
      },
      {
        name: "CFC-11/R11 = trichlorofluoromethane",
        name_ar: "CFC-11/R11 = ثلاثي كلوروفلورو الميثان",
      },
      {
        name: "CFC-113",
        name_ar: "CFC-113",
      },
      {
        name: "CFC-114",
        name_ar: "CFC-114",
      },
      {
        name: "CFC-115",
        name_ar: "CFC-115",
      },
      {
        name: "CFC-12/R12 = dichlorodifluoromethane",
        name_ar: "CFC-12/R12 = ثنائي كلورو ثنائي فلورو الميثان",
      },
      {
        name: "CFC-13",
        name_ar: "CFC-13",
      },
    ];

    await queryInterface.bulkInsert("gases", gases, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("gases", null, {});
  },
};
