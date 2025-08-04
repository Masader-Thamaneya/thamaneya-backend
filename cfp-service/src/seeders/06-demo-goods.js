"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("goods", [
      { name: "Electricity", name_ar: "كهرباء" },
      { name: "Electricity (WTT)", name_ar: "كهرباء - من المصدر" },
      { name: "Electricity (T&D)", name_ar: "كهرباء - نقل وتوزيع" },

      { name: "PV Generation", name_ar: "توليد كهربي ضوئي" },
      { name: "Water", name_ar: "مياه" },
      { name: "Wastewater treatment", name_ar: "معالجة مياه الصرف" },
      { name: "Paper", name_ar: "ورق" },
      { name: "Plastic", name_ar: "بلاستيك" },
      { name: "Ink", name_ar: "حبر" },
      { name: "Office waste", name_ar: "نفايات مكتبية" },
      { name: "Shredded Paper Waste", name_ar: "نفايات ورق ممزق" },
      { name: "Average car, petrol", name_ar: "سيارة متوسطة، بنزين" },
      {
        name: "Average car, petrol (WTT)",
        name_ar: "سيارة متوسطة، بنزين (WTT)",
      },
      {
        name: "Public transp.(PT) Average bus",
        name_ar: "النقل العام، حافلة متوسطة",
      },
      {
        name: "PT. Average bus (WTT)",
        name_ar: "النقل العام، حافلة متوسطة (WTT)",
      },
      { name: "Average MC", name_ar: "دراجة نارية متوسطة" },
      { name: "Average MC (WTT)", name_ar: "دراجة نارية متوسطة (WTT)" },
      { name: "Commuting", name_ar: "تنقلات الموظفين" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("goods", null, {});
  },
};
