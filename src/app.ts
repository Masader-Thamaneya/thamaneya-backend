import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // or "*" for testing
    credentials: true, // allow cookies / Authorization headers
  })
);

app.get("/", (req, res) => {
  res.send("Hello from root get");
});

app.use("/api", routes);
app.use(errorHandler);

export default app;
