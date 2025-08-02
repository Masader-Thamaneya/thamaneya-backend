"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";
import { underscoredIf } from "sequelize/types/utils";

interface GeneratorAttributes {
  id?: number;
  report_id: string;
  year: number;
  type: "generator" | "vehicle";
  fuel_type: "diesel" | "petrol" | "gas";
  number: number;
  activity_data: number;
  emissions?: number;
}

export type GeneratorCreationAttributes = Omit<GeneratorAttributes, "id">;

export class Generator
  extends Model<GeneratorAttributes, GeneratorCreationAttributes>
  implements GeneratorAttributes
{
  declare report_id: string;
  declare year: number;
  declare type: "generator" | "vehicle";
  declare fuel_type: "diesel" | "petrol" | "gas";
  declare number: number;
  declare activity_data: number;
  declare emissions?: number;

  static associate(models: any) {
    Generator.belongsTo(models.Report, {
      foreignKey: "report_id",
      as: "report",
    });
  }
}

export default (sequelize: Sequelize) => {
  Generator.init(
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
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("generator", "vehicle"),
        allowNull: false,
      },
      fuel_type: {
        type: DataTypes.ENUM("diesel", "petrol", "gas"),
        allowNull: false,
      },
      number: {
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
      modelName: "Generator",
      tableName: "generators",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ["reports_id"],
        },
        {
          unique: true,
          fields: ["report_id", "fuel_type", "type"],
        },
      ],
    }
  );

  return Generator;
};
