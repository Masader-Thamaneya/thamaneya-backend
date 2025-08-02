"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface GoodEmissionFactorAttributes {
  id?: number;
  good_id: number;
  unit_id: number;
  year: number;
  ef: number;
}

export type GoodEmissionFactorCreationAttributes = Omit<
  GoodEmissionFactorAttributes,
  "id"
>;

export class GoodEmissionFactor
  extends Model<
    GoodEmissionFactorAttributes,
    GoodEmissionFactorCreationAttributes
  >
  implements GoodEmissionFactorAttributes
{
  declare good_id: number;
  declare unit_id: number;
  declare year: number;
  declare ef: number;

  static associate(models: any) {
    GoodEmissionFactor.belongsTo(models.Good, {
      foreignKey: "good_id",
      as: "good",
    });

    GoodEmissionFactor.belongsTo(models.Unit, {
      foreignKey: "unit_id",
      as: "unit",
    });
  }
}

export default (sequelize: Sequelize) => {
  GoodEmissionFactor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      good_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      ef: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "GoodEmissionFactor",
      tableName: "emission_factor_goods",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ["good_id"],
        },
        {
          fields: ["unit_id"],
        },
        {
          fields: ["year"],
        },
        {
          unique: true,
          fields: ["good_id", "unit_id", "year"], // to prevent duplicates
        },
      ],
    }
  );

  return GoodEmissionFactor;
};
