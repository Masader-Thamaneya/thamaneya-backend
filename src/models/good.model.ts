"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface GoodAttributes {
  id?: number;
  name: string;
  name_ar: string;
}

export class Good extends Model<GoodAttributes> implements GoodAttributes {
  declare name: string;
  declare name_ar: string;

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  Good.init(
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
      modelName: "Good",
      tableName: "goods",
      timestamps: false,
      underscored: true,
    }
  );

  return Good;
};
