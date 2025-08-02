import { app } from "./server";
import authRoutes from "./routes/auth.routes";
import companyRoutes from "./routes/company.routes";
import { authenticate } from "./middlewares/auth";

import { errorHandler } from "./middlewares/errorHandler";

app.post("/", (req, res) => {
  res.send("Hello from root post");
});

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API",
  });
});

app.use("/auth", authRoutes);
app.use("/companies", authenticate, companyRoutes);

app.use("/boards", (req, res) => {});
app.use("/users", (req, res) => {});

app.use(errorHandler);
