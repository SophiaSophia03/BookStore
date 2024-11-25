const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");

router.route("/placeOrders").post(authenticateToken, OrderController.placeOrders);

router.route("/getOrderHistory").get(authenticateToken, OrderController.getOrderHistory);

module.exports = router;