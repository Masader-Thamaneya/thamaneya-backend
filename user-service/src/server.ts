import express from "express";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    "\x1b[32m\x1b[2m%s\x1b[0m",
    `Server is running on http://localhost:${PORT}`
  );
});

export { app };
