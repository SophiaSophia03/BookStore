if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
require("./Database/mongodb.js")
const port = process.env.PORT;

const userRouter = require("./routes/user.js");


// Middleware to parse JSON
app.use(express.json());


//Routes
app.use("/api/users", userRouter);



app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
