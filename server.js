require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
app.use(express.json());

connectDb();

app.use("/", restaurantRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
