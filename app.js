/////////// import npm package
const { json } = require("body-parser");
const express = require("express");
const joi = require("joi");
const mongoose = require("mongoose");
const { notFound, errorHandling } = require("./middleWare/errors.js");
const dotenv = require("dotenv");
dotenv.config();

////////////connect to DB
mongoose
  .connect(process.env.MONGO_url)
  .then(() => console.log(`connected succsfully to DB `))
  .catch((err) => console.log(`failed to connect ${err}`));

////////////Routes
const { bookRoute } = require("./Routes/bookRoute.js");
const { authorRoute } = require("./Routes/authorRoute.js");
const {authRoute} = require("./Routes/auth");
const {userRoute}= require("./Routes/userRoute")

/////////// init app
const app = express();
const port = process.env.port;
app.listen(port, () => console.log(`server is connected on port ${port}`));

/////////// Middle Ware
app.use(express.json());

///////////My Routes
app.use("/books", bookRoute);
app.use("/author", authorRoute);
app.use("/auth",authRoute );
app.use("/user",userRoute );

// Error Handling
app.use((req, res, next) => {
  let error = new Error(`Not Found ${req.originalUrl}`);
  next(error);
});

app.use((err, req, res, next) => {
  res.status(404).send({ message: err.message });
});
