"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface RefrigerantUsageAttributes {
  id?: number;
  report_id: string;
  gas_id: number;
  unit_id: number;
  activity_data: number;
  emissions?: number;
}

export type RefrigerantUsageCreationAttributes = Omit<
  RefrigerantUsageAttributes,
  "id"
>;

export class RefrigerantUsage
  extends Model<RefrigerantUsageAttributes, RefrigerantUsageCreationAttributes>
  implements RefrigerantUsageAttributes
{
  declare id: number;
  declare report_id: string;
  declare gas_id: number;
  declare unit_id: number;
  declare activity_data: number;
  declare emissions?: number;

  static associate(models: any) {
    RefrigerantUsage.belongsTo(models.Report, {
      foreignKey: "report_id",
      as: "report",
    });
  }
}

export default (sequelize: Sequelize) => {
  RefrigerantUsage.init(
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
      gas_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
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
      modelName: "RefrigerantUsage",
      tableName: "refrigerant_usage",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ["report_id"],
        },
        {
          name: "refrigerant_usage_report_gas",
          fields: ["report_id", "gas_id"],
          unique: true,
        },
      ],
    }
  );

  return RefrigerantUsage;
};
