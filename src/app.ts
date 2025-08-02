import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from root get");
});

app.use("/api", routes);
app.use(errorHandler);

export default app;
