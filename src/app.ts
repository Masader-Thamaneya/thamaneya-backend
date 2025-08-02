import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { authenticate } from "./middlewares/auth";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from root get");
});

app.use(authenticate, routes);
app.use(errorHandler);

export default app;
