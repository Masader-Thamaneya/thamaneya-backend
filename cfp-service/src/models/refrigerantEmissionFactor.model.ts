"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface RefrigerentEmissionFactorAttributes {
  id?: number;
  gas_id: number;
  unit_id: number;
  year: number;
  ef: number;
}

export type RefrigerentEmissionFactorCreationAttributes = Omit<
  RefrigerentEmissionFactorAttributes,
  "id"
>;

export class RefrigerentEmissionFactor
  extends Model<
    RefrigerentEmissionFactorAttributes,
    RefrigerentEmissionFactorCreationAttributes
  >
  implements RefrigerentEmissionFactorAttributes
{
  declare gas_id: number;
  declare unit_id: number;
  declare year: number;
  declare ef: number;

  static associate(models: any) {
    RefrigerentEmissionFactor.belongsTo(models.Gas, {
      foreignKey: "gas_id",
      as: "gas",
    });

    RefrigerentEmissionFactor.belongsTo(models.Unit, {
      foreignKey: "unit_id",
      as: "unit",
    });
  }
}

export default (sequelize: Sequelize) => {
  RefrigerentEmissionFactor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      gas_id: {
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
      },
      ef: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RefrigerantEmissionFactor",
      tableName: "emission_factor_refrigerants",
      timestamps: false,
      underscored: true,
      indexes: [
        { fields: ["gas_id"] },
        { fields: ["unit_id"] },
        { fields: ["year"] },
        {
          unique: true,
          fields: ["gas_id", "unit_id", "year"],
          name: "unique_gas_unit_year",
        },
      ],
    }
  );

  return RefrigerentEmissionFactor;
};
