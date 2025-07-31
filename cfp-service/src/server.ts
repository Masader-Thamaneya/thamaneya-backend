import dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: ".env", quiet: true });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    "\x1b[32m\x1b[2m%s\x1b[0m",
    `Server is running on http://localhost:${PORT}`
  );
});
