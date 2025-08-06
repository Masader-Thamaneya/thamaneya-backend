"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const wasteTypes = [
      {
        name: "Aggregates",
        name_ar: "الركام",
        treatments: ["Recycled", "Landfill"],
      },
      {
        name: "Average construction",
        name_ar: "متوسط مخلفات البناء",
        treatments: ["Recycled", "Combustion"],
      },
      { name: "Asbestos", name_ar: "الأسبستوس", treatments: ["Landfill"] },
      {
        name: "Asphalt",
        name_ar: "الأسفلت",
        treatments: ["Recycled", "Landfill"],
      },
      { name: "Bricks", name_ar: "الطوب", treatments: ["Landfill"] },
      {
        name: "Concrete",
        name_ar: "الخرسانة",
        treatments: ["Recycled", "Landfill"],
      },
      {
        name: "Insulation",
        name_ar: "العزل",
        treatments: ["Recycled", "Landfill"],
      },
      {
        name: "Metals",
        name_ar: "المعادن",
        treatments: ["Recycled", "Landfill"],
      },
      {
        name: "Soils",
        name_ar: "التربة",
        treatments: ["Recycled", "Landfill"],
      },
      {
        name: "Mineral oil",
        name_ar: "الزيت المعدني",
        treatments: ["Recycled", "Combustion"],
      },
      {
        name: "Plasterboard",
        name_ar: "ألواح الجبس",
        treatments: ["Recycled", "Landfill"],
      },
      { name: "Tyres", name_ar: "الإطارات", treatments: ["Recycled"] },
      {
        name: "Wood",
        name_ar: "الخشب",
        treatments: ["Recycled", "Combustion", "Composting", "Landfill"],
      },

      {
        name: "Books",
        name_ar: "الكتب",
        treatments: ["Recycled", "Combustion", "Composting", "Landfill"],
      },
      {
        name: "Glass",
        name_ar: "الزجاج",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Clothing",
        name_ar: "الملابس",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },

      {
        name: "Household residual waste",
        name_ar: "مخلفات منزلية متبقية",
        treatments: ["Combustion", "Landfill"],
      },
      {
        name: "Organic: food and drink waste",
        name_ar: "نفايات الطعام والشراب",
        treatments: ["Combustion", "Composting", "Landfill"],
      },
      {
        name: "Organic: garden waste",
        name_ar: "نفايات الحدائق",
        treatments: ["Combustion", "Composting", "Landfill"],
      },
      {
        name: "Organic: mixed food and garden waste",
        name_ar: "نفايات طعام وحدائق مختلطة",
        treatments: ["Combustion", "Composting", "Landfill"],
      },
      {
        name: "Commercial and industrial waste",
        name_ar: "مخلفات تجارية وصناعية",
        treatments: ["Combustion", "Landfill"],
      },

      {
        name: "WEEE - fridges and freezers",
        name_ar: "النفايات الإلكترونية - الثلاجات والمجمدات",
        treatments: ["Landfill"],
      },
      {
        name: "WEEE - large",
        name_ar: "النفايات الإلكترونية - كبيرة",
        treatments: ["Combustion", "Landfill"],
      },
      {
        name: "WEEE - mixed",
        name_ar: "النفايات الإلكترونية - مختلطة",
        treatments: ["Combustion", "Landfill"],
      },
      {
        name: "WEEE - small",
        name_ar: "النفايات الإلكترونية - صغيرة",
        treatments: ["Combustion", "Landfill"],
      },
      { name: "Batteries", name_ar: "البطاريات", treatments: ["Landfill"] },

      {
        name: "Metal: aluminium cans and foil (excl. forming)",
        name_ar: "معدن: علب ألومنيوم ورقائق (بدون تشكيل)",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Metal: mixed cans",
        name_ar: "معدن: علب مختلطة",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Metal: scrap metal",
        name_ar: "معدن: خردة",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Metal: steel cans",
        name_ar: "معدن: علب صفيح",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },

      {
        name: "Plastics: average plastics",
        name_ar: "بلاستيك: بلاستيك متوسط",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Plastics: average plastic film",
        name_ar: "بلاستيك: أفلام بلاستيكية متوسطة",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Plastics: average plastic rigid",
        name_ar: "بلاستيك: صلب متوسط",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Plastics: HDPE (incl. forming)",
        name_ar: "بلاستيك: HDPE (مع التشكيل)",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Plastics: LDPE and LLDPE (incl. forming)",
        name_ar: "بلاستيك: LDPE و LLDPE (مع التشكيل)",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Plastics: PET (incl. forming)",
        name_ar: "بلاستيك: PET (مع التشكيل)",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Plastics: PP (incl. forming)",
        name_ar: "بلاستيك: PP (مع التشكيل)",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Plastics: PS (incl. forming)",
        name_ar: "بلاستيك: PS (مع التشكيل)",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },
      {
        name: "Plastics: PVC (incl. forming)",
        name_ar: "بلاستيك: PVC (مع التشكيل)",
        treatments: ["Recycled", "Combustion", "Landfill"],
      },

      {
        name: "Paper and board: board",
        name_ar: "ورق وكرتون: كرتون",
        treatments: ["Recycled", "Combustion", "Composting", "Landfill"],
      },
      {
        name: "Paper and board: mixed",
        name_ar: "ورق وكرتون: مختلط",
        treatments: ["Recycled", "Combustion", "Composting", "Landfill"],
      },
      {
        name: "Paper and board: paper",
        name_ar: "ورق وكرتون: ورق",
        treatments: ["Recycled", "Combustion", "Composting", "Landfill"],
      },
    ];
    const data = wasteTypes.map((wt) => ({
      name: wt.name,
      name_ar: wt.name_ar,
      treatments: JSON.stringify(wt.treatments),
    }));

    await queryInterface.bulkInsert("wastes", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wastes", null, {});
  },
};
