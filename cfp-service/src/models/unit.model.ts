"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface UnitAttributes {
  id?: number;
  name: string;
  name_ar: string;
  symbol: string;
  symbol_ar: string;
}

export class Unit extends Model<UnitAttributes> implements UnitAttributes {
  declare name: string;
  declare name_ar: string;
  declare symbol: string;
  declare symbol_ar: string;

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  Unit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      name_ar: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      symbol: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      symbol_ar: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Unit",
      tableName: "units",
      timestamps: false,
      underscored: true,
    }
  );

  return Unit;
};
