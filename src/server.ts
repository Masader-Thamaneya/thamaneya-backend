import app from "./app";

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    "\x1b[32m\x1b[2m%s\x1b[0m",
    `Server is running on http://localhost:${PORT}`
  );
});
