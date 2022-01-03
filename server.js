const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const bookRoute = require("./routes/books");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const stripeRoute = require("./routes/stripe");
const errorHandler = require("./middleware/error");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("MongoDB connected successfully..."))
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/checkout", stripeRoute);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Backend is running...");
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
