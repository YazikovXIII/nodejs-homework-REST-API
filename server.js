const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

// console.log(process.env);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// https://goit-nodejs-db-api.onrender.com/api/contacts
