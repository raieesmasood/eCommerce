const express = require("express");
const connectDb = require("./config/db");
const morgan = require("morgan");

const dotenv = require("dotenv");

//config env
dotenv.config();

//db connect
connectDb();

//inheritence
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//port
const port = process.env.PORT || 8825;


const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

app.get("/", (req, res) => {
  res.send("<h1>Hello from ecom server!</h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
