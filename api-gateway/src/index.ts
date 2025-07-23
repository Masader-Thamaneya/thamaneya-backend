import express from "express";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.routes";
// import { userRoutes } from "./routes/user.routes";

dotenv.config();
const app = express();

app.use("/auth", authRoutes); // proxy to auth service
// app.use("/users", userRoutes); // proxy to user service

app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on port ${process.env.PORT}`);
});
