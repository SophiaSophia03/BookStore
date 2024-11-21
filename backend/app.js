if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT;
const dbUrl = process.env.MONGO_URL;


// MongoDB connection setup
const main = async () => {
  await mongoose.connect(dbUrl);
};
main()
  .then((res) => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hi I am port number 3000");
});


app.listen(port, () => {
  console.log(`App is listing at port ${port}`);
});
