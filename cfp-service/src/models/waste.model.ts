("use strict");
import { Model, Sequelize, DataTypes } from "sequelize";

interface WasteAttributes {
  id?: number;
  name: string;
  name_ar: string;
  treatments: string[];
}

export type WasteCreationAttributes = Omit<WasteAttributes, "id">;

export class Waste extends Model<WasteAttributes> implements WasteAttributes {
  declare name: string;
  declare name_ar: string;
  declare treatments: string[];

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  Waste.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      treatments: {
        type: DataTypes.JSON(),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Waste",
      tableName: "wastes",
      timestamps: false,
    }
  );

  return Waste;
};
