("use strict");
import { Model, Sequelize, DataTypes } from "sequelize";

interface WasteTypeAttributes {
  id?: number;
  name: string;
  name_ar: string;
  treatments: string[];
}

export type WasteTypeCreationAttributes = Omit<WasteTypeAttributes, "id">;

export class WasteType
  extends Model<WasteTypeAttributes>
  implements WasteTypeAttributes
{
  declare name: string;
  declare name_ar: string;
  declare treatments: string[];

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  WasteType.init(
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
      modelName: "WasteType",
      tableName: "waste_types",
      timestamps: false,
    }
  );

  return WasteType;
};
