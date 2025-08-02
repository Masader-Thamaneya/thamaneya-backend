"use strict";
import { Model } from "sequelize";
import { Company } from "./company.model";
import bcrypt from "bcrypt";

interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  companyId?: string;
  role?: "admin" | "employee" | "manager";
  company?: any;
}

export type UserCreationAttributes = Omit<UserAttributes, "id">;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  name!: string;
  email!: string;
  passwordHash!: string;
  companyId?: string;
  role?: "admin" | "employee" | "manager";

  company?: Company;

  static associate(models: any) {
    User.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "company",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash);
  }
}

export default (sequelize: any, DataTypes: any) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password_hash",
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "company_id",
      },
      role: {
        type: DataTypes.ENUM("admin", "employee", "manager"),
        allowNull: false,
        defaultValue: "manager",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
    }
  );

  return User;
};
