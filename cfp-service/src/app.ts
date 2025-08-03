import express from "express";
import routes from "./routes";
import { authenticate } from "./middlewares/auth";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use("/api", authenticate, routes); // All routes prefixed with /api
// app.use("/companies", authenticate, companyRoutes);

app.use(errorHandler);

export default app;
