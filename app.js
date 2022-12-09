const express = require("express");
const path = require("path");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");

const app = express();



// cors is a middleware that allows us to make requests from different domains
app.use(cors());

// It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter);

// to serve static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.all("*", (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
});
app.use(globalErrorHandler);

module.exports = app;
