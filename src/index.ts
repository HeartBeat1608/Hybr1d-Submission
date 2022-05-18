import app from "./server";

const PORT = app.get("PORT");

app.listen(PORT, () => {
  console.log(`[SRV] Ready on port ${PORT}`);
});
