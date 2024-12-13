const User = require("../models/user.js");
const Book = require("../models/book.js");
const Order = require("../models/order.js");
const asyncHandler = require("express-async-handler");

//Place order
module.exports.placeOrders = asyncHandler(async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (let orderData of order) {
      const newOrder = await Order({ user: id, book: orderData._id });
      const savenewOrder = await newOrder.save();

      //Saving order in model:
      await User.findByIdAndUpdate(id, {
        $push: { orders: newOrder._id },
        $pull: { cart: orderData._id },
      });
    }
    return res.status(200).json({ message: "Order Placed Sucessfuly" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get order history of orders
module.exports.getOrderHistory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderData = userData.orders.reverse();
    return res.status(200).json({ status: "Success", data: orderData });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all Orders *admin
module.exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "YOu are not allowed to perform this task" });
    }else{
    const userData = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: userData
    });
  }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

//Order status update *admin
module.exports.orderStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, {status:req.body.status});
    return res.json({
      status: "Success",
      message: "Status updated sucessfuly!"
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});





