"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface WasteUsageAttributes {
  id?: number;
  report_id: string;
  waste_id: number;
  unit_id: number;
  treatment: "Recycled" | "Combustion" | "Composting" | "Landfill";
  activity_data: number;
  emissions?: number;
}

export type WasteUsageCreationAttributes = Omit<WasteUsageAttributes, "id">;

export class WasteUsage
  extends Model<WasteUsageAttributes, WasteUsageCreationAttributes>
  implements WasteUsageAttributes
{
  declare id: number;
  declare report_id: string;
  declare waste_id: number;
  declare unit_id: number;
  declare treatment: "Recycled" | "Combustion" | "Composting" | "Landfill";
  declare activity_data: number;
  declare emissions?: number;

  static associate(models: any) {
    WasteUsage.belongsTo(models.Report, {
      foreignKey: "report_id",
      as: "report",
    });
  }
}

export default (sequelize: Sequelize) => {
  WasteUsage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      report_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      waste_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      treatment: {
        type: DataTypes.ENUM(
          "Recycled",
          "Combustion",
          "Composting",
          "Landfill"
        ),
        allowNull: false,
      },
      activity_data: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "WasteUsage",
      tableName: "waste_usages",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ["report_id"],
        },
        {
          name: "waste_usage_report_waste",
          fields: ["report_id", "waste_id"],
          unique: true,
        },
      ],
    }
  );

  return WasteUsage;
};
