import db from "../models";
import { User as UserType } from "../models/user.model";
import { UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const User = db.User as typeof UserType;

class UserRepository {
  static async createUser({
    name,
    email,
    passwordHash,
  }: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    try {
      return await User.create({ name, email, passwordHash });
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictError("Email already exists");
      }
      throw error;
    }
  }

  static async findUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  static async findUserById(id: string) {
    return await User.findByPk(id);
  }
}

export default UserRepository;
