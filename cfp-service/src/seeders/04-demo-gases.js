"use strict";

/* {
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
      }, */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const gases = [
      {
        name: "R12",
        name_ar: "R12",
      },
      {
        name: "R22",
        name_ar: "R22",
      },
      {
        name: "R32",
        name_ar: "R32",
      },
      {
        name: "R34",
        name_ar: "R34",
      },
      {
        name: "R123",
        name_ar: "R123",
      },
      {
        name: "R134A",
        name_ar: "R134A",
      },
      {
        name: "R404",
        name_ar: "R404",
      },
      {
        name: "R407A",
        name_ar: "R407A",
      },
      {
        name: "R410A",
        name_ar: "R410A",
      },
    ];

    await queryInterface.bulkInsert("gases", gases, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("gases", null, {});
  },
};
