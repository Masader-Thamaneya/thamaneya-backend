"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface SectorAttributes {
  id?: number;
  name: string;
  description?: string;
}

export class Sector
  extends Model<SectorAttributes>
  implements SectorAttributes
{
  name!: string;
  description?: string;

  static associate(models: any) {
    // A sector can have many companies
    Sector.hasMany(models.Company, {
      foreignKey: "sector_id",
      as: "companies",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  }
}

export default (sequelize: Sequelize) => {
  Sector.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Sector",
      tableName: "sectors",
      timestamps: true,
      underscored: true,
    }
  );

  return Sector;
};
