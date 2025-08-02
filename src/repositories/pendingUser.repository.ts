import db from "../models";
import { PendingUser as PendingUserType } from "../models/pendinguser.model";
import { UniqueConstraintError } from "sequelize";

const PendingUser = db.PendingUser as typeof PendingUserType;

class PendingUserRepository {
  static async createOrUpdate(
    email: string,
    name: string,
    password: string,
    otpCode: string,
    otpExpiresAt: Date
  ) {
    try {
      const newUser = await PendingUser.create({
        email,
        name,
        passwordHash: password,
        otpCode,
        otpExpiresAt,
      });
      return newUser;
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        const existingUser = await PendingUser.findByPk(email);

        if (!existingUser) {
          throw new Error(
            "Failed to create or update user due to race condition."
          );
        }

        await existingUser.update({
          name: name ?? existingUser.name,
          passwordHash: password ?? existingUser.passwordHash,
          otpCode,
          otpExpiresAt,
        });
        return existingUser;
      }
      throw error;
    }
  }

  static async update(
    email: string,
    updates: Partial<{
      name: string;
      passwordHash: string;
      otpCode: string;
      otpExpiresAt: Date;
    }>
  ) {
    const validUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    return await PendingUser.update(validUpdates, {
      where: { email },
    });
  }

  static async findByEmail(email: string) {
    return await PendingUser.findByPk(email);
  }
}

export default PendingUserRepository;
