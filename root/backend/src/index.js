const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(express.json());

const countriesRoutes = require("./routes/countriesRouter");

app.use("/api/countries", countriesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
