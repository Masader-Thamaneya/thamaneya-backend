import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const { ROUTES } = require("./routes");
const { setupProxies } = require("./proxy");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
setupProxies(app, ROUTES);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    "\x1b[32m\x1b[2m%s\x1b[0m",
    `Server is running on http://localhost:${PORT}`
  );
});

app.use(
  cors({
    origin: process.env.CLEINT_URL,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Connection",
      "Cache-Control",
    ],
    credentials: true,
  })
);

export { app };
