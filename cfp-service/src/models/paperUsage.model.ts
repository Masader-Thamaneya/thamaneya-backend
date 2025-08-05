"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface PaperUsageAttributes {
  id?: number;
  report_id: string;
  type: "A3" | "A4";
  activity_data: number;
}

export type PaperUsageCreationAttributes = Omit<PaperUsageAttributes, "id">;

export class PaperUsage
  extends Model<PaperUsageAttributes, PaperUsageCreationAttributes>
  implements PaperUsageAttributes
{
  declare id: number;
  declare report_id: string;
  declare type: "A3" | "A4";
  declare activity_data: number;

  static associate(models: any) {
    PaperUsage.belongsTo(models.Report, {
      foreignKey: "report_id",
      as: "report",
    });
  }
}

export default (sequelize: Sequelize) => {
  PaperUsage.init(
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
      type: {
        type: DataTypes.ENUM("A3", "A4"),
        allowNull: false,
      },
      activity_data: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PaperUsage",
      tableName: "paper_usages",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ["report_id"],
        },
      ],
    }
  );

  return PaperUsage;
};
