/////////// import npm package
const express = require("express");
const path = require("path");
const helmt = require("helmt");
const cors = require("cors");
const connectToDb = require("./Config/db.js");
const dotenv = require("dotenv").config();
const { notFound, errorHandling } = require("./middleWare/errors.js");

////////////connect to DB
connectToDb();

/////////// init app
const app = express();
const port = process.env.port;
app.listen(port, () => console.log(`server is connected on port ${port}`));

/////////// Middle Ware
app.use(express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmt());
app.use(cors());
app.set("view engine", "ejs");
///////////My Routes
app.use("/books", require("./Routes/bookRoute.js"));
app.use("/author", require("./Routes/authorRoute.js"));
app.use("/auth", require("./Routes/auth"));
app.use("/user", require("./Routes/userRoute"));
app.use("/password", require("./Routes/passwordRoute.js"));
app.use("/upload", require("./Routes/uploadRoute.js"));

// Error Handling
app.use((req, res, next) => {
  let error = new Error(`Not Found ${req.originalUrl}`);
  next(error);
});

app.use((err, req, res, next) => {
  res.status(404).send({ message: err.message });
});
