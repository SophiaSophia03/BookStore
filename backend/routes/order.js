const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");

router.route("/placeOrders").post(authenticateToken, OrderController.placeOrders);

router.route("/getOrderHistory").get(authenticateToken, OrderController.getOrderHistory);

router.route("/getAllOrders").get(authenticateToken, OrderController.getAllOrders);

router.route("/orderStatus/:id").put(authenticateToken, OrderController.orderStatus);


module.exports = router;