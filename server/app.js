const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter);
app.all("*", (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
});
app.use(globalErrorHandler);

module.exports = app;
