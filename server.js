const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
// "mongodb+srv://vladzaraza:1HB8tz7p48pNKe0z@cluster0.4fiikna.mongodb.net/GoITNodeJS&DB?retryWrites=true&w=majority";

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
