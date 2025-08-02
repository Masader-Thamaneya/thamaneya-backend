import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ROUTES from "./routes";
import setupProxies from "./proxies";

dotenv.config();
const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

setupProxies(app, ROUTES);

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    "\x1b[32m\x1b[2m%s\x1b[0m",
    `Server is running on http://localhost:${PORT}`
  );
});

export { app };
