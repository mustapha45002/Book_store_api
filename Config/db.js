const mongoose = require("mongoose");

function connectToDb() {
  try {
    mongoose.connect(process.env.MONGO_url);
    console.log(`connected succsfully to DB `);
  } catch(err) {
    console.log(`failed to connect ${err}`);
  }
}

// mongoose
//   .connect(process.env.MONGO_url)
//   .then(() => console.log(`connected succsfully to DB `))
//   .catch((err) => console.log(`failed to connect ${err}`));

module.exports = connectToDb;
