"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface GasAttributes {
  id?: number;
  name: string;
  name_ar: string;
}

export class Gas extends Model<GasAttributes> implements GasAttributes {
  declare name: string;
  declare name_ar: string;

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  Gas.init(
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
    },
    {
      sequelize,
      modelName: "Gas",
      tableName: "gases",
      timestamps: false,
      underscored: true,
    }
  );

  return Gas;
};
