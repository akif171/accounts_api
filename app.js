require("dotenv").config();

const express = require("express");
const app = express();
const jouurnalRoutes = require("./routes/journal");
const ledgerRoutes = require("./routes/ledger");
const userRoutes = require("./routes/user");
const connectDB = require("./db/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = 5000;
connectDB();
const corsOptions = {
  origin: "https://accouts-app-frontend.vercel.app", //included origin as true
  credentials: true, //included credentials as true
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/journal", jouurnalRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
