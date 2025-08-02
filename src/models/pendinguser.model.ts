"use strict";
import { Model } from "sequelize";
import bcrypt from "bcrypt";

interface PendingUserAttributes {
  email: string;
  name: string;
  passwordHash: string;
  otpCode: string;
  otpExpiresAt: Date;
}

export class PendingUser
  extends Model<PendingUserAttributes>
  implements PendingUserAttributes
{
  email!: string;
  name!: string;
  passwordHash!: string;
  otpCode!: string;
  otpExpiresAt!: Date;

  static associate(models: any) {}

  isExpired() {
    return new Date() > this.otpExpiresAt;
  }

  verifyOtp(enteredCode: string): boolean {
    return this.otpCode === enteredCode;
  }
}
export default (sequelize: any, DataTypes: any) => {
  PendingUser.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
          isEmail: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password_hash",
      },
      otpCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "otp_code",
      },
      otpExpiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "otp_expires_at",
      },
    },
    {
      sequelize,
      modelName: "PendingUser",
      tableName: "pending_users",
      underscored: true,
      timestamps: true,
    }
  );

  PendingUser.beforeCreate(async (user: PendingUser) => {
    user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
  });

  PendingUser.beforeUpdate(async (user: PendingUser) => {
    if (user.changed("passwordHash")) {
      user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
    }
  });

  return PendingUser;
};
