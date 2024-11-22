const mongoose = require("mongoose");
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
