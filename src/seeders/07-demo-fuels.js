"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fuels = [
      { name: "Butane", name_ar: "بيوتان" },
      { name: "CNG", name_ar: "غاز طبيعي مضغوط (CNG)" },
      { name: "LNG", name_ar: "غاز طبيعي مسال (LNG)" },
      { name: "LPG", name_ar: "غاز بترولي مسال (LPG)" },
      { name: "Other petroleum gas", name_ar: "غاز بترولي آخر" },
      { name: "Propane", name_ar: "بروبان" },
      { name: "Aviation spirit", name_ar: "بنزين طيران" },
      { name: "Aviation turbine fuel", name_ar: "وقود توربينات الطيران" },
      { name: "Burning oil", name_ar: "زيت احتراق" },
      {
        name: "Diesel (average biofuel blend)",
        name_ar: "ديزل (مزيج حيوي متوسط)",
      },
      {
        name: "Diesel (100% mineral diesel)",
        name_ar: "ديزل (ديزل معدني 100%)",
      },
      { name: "Fuel oil", name_ar: "زيت الوقود" },
      { name: "Gas oil", name_ar: "زيت الغاز" },
      { name: "Lubricants", name_ar: "زيوت تشحيم" },
      { name: "Naphtha", name_ar: "نافثا" },
      {
        name: "Petrol (average biofuel blend)",
        name_ar: "بنزين (مزيج حيوي متوسط)",
      },
      {
        name: "Petrol (100% mineral petrol)",
        name_ar: "بنزين (بنزين معدني 100%)",
      },
      {
        name: "Processed fuel oils - residual oil",
        name_ar: "زيوت وقود معالجة - زيت متبقي",
      },
      {
        name: "Processed fuel oils - distillate oil",
        name_ar: "زيوت وقود معالجة - زيت مقطر",
      },
      { name: "Refinery miscellaneous", name_ar: "منتجات متنوعة من المصفاة" },
      { name: "Waste oils", name_ar: "زيوت نفايات" },
      { name: "Marine gas oil", name_ar: "زيت غاز بحري" },
      { name: "Marine fuel oil", name_ar: "زيت وقود بحري" },
      {
        name: "Natural gas (100% mineral blend)",
        name_ar: "غاز طبيعي (خلطة معدنية 100%)",
      },
    ];

    await queryInterface.bulkInsert("fuels", fuels);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("fuels", null, {});
  },
};
