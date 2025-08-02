// src/types/express/index.d.ts
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: "admin" | "employee" | "manager";
        companyId: string;
      };
    }
  }
}
